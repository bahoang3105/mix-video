const PublishStream = {};

const logHeader = 'PublishStream.js :';
const logEventHeader = 'PublishStream.js ====';

// private methods
const sendMessage = (webSocket, message) => {
	if (webSocket) {
		webSocket.send(JSON.stringify(message));
	}
}

const generateDomainFromUrl = url => {
	const match = url.match(/^(?:wss?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im);
	if (match) {
		return match[1];
	}
	return '';
}

const findIp = string => {
	const match = string.match(new RegExp('\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b', 'gi'));
	if (match) {
		return match[0];
	}
	return '';
}

const initConfig = (instance, options) => {
	instance.stream = null;
	instance.webSocket = null;
	instance.peerConnection = null;
	instance.connectionConfig = {};

	instance.status = 'creating';

	instance.videoElement = null;
	instance.connectionUrl = null;

	if (options && options.callbacks) {

		instance.callbacks = options.callbacks;
	} else {
		instance.callbacks = {};
	}
}

const addMethod = (instance) => {

	const errorHandler = (error) => {

		if (instance.callbacks.error) {

			instance.callbacks.error(error);
		}
	}

	// From https://webrtchacks.com/limit-webrtc-bandwidth-sdp/
	const setBitrateLimit = (sdp, media, bitrate) => {

		const lines = sdp.split('\n');
		let line = -1;

		for (let i = 0; i < lines.length; i++) {
			if (lines[i].indexOf('m=' + media) === 0) {
				line = i;
				break;
			}
		}
		if (line === -1) {
			// Could not find the m line for media
			return sdp;
		}

		// Pass the m line
		line++;

		// Skip i and c lines
		while (lines[line].indexOf('i=') === 0 || lines[line].indexOf('c=') === 0) {

			line++;
		}

		// If we're on a b line, replace it
		if (lines[line].indexOf('b') === 0) {

			lines[line] = 'b=AS:' + bitrate;

			return lines.join('\n');
		}

		// Add a new b line
		let newLines = lines.slice(0, line)

		newLines.push('b=AS:' + bitrate)
		newLines = newLines.concat(lines.slice(line, lines.length))

		return newLines.join('\n')
	}

	const initWebSocket = (connectionUrl) => {

		if (!connectionUrl) {
			errorHandler('connectionUrl is required');
			return;
		}

		instance.connectionUrl = connectionUrl;

		let webSocket = null;

		try {

			webSocket = new WebSocket(connectionUrl);
		} catch (error) {

			errorHandler(error);
		}


		instance.webSocket = webSocket;

		webSocket.onopen = () => {

			// Request offer at the first time.
			sendMessage(webSocket, {
				command: 'request_offer'
			});
		};

		webSocket.onmessage = (e) => {

			const message = JSON.parse(e.data);

			if (message.error) {
				console.error('webSocket.onmessage', message.error);
				errorHandler(message.error);
			}

			if (message.command === 'offer') {

				// OME returns offer. Start create peer connection.
				createPeerConnection(
					message.id,
					message.peer_id,
					message.sdp,
					message.candidates,
					message.ice_servers
				);
			}
		};

		webSocket.onerror = (error) => {

			console.error('webSocket.onerror', error);
			errorHandler(error);
		};

		webSocket.onclose = (e) => {

			if (!instance.removing) {

				if (instance.callbacks.connectionClosed) {

					instance.callbacks.connectionClosed('websocket', e);
				}
			}
		};

	}

	const appendFmtp = (sdp) => {

		const fmtpStr = instance.connectionConfig.sdp.appendFmtp;

		const lines = sdp.split('\n');
		const payloads = [];

		for (let i = 0; i < lines.length; i++) {

			if (lines[i].indexOf('m=video') === 0) {

				const tokens = lines[i].split(' ')

				for (let j = 3; j < tokens.length; j++) {

					payloads.push(tokens[j].replace('\r', ''));
				}

				break;
			}
		}

		for (let i = 0; i < payloads.length; i++) {

			let fmtpLineFound = false;

			for (let j = 0; j < lines.length; j++) {

				if (lines[j].indexOf('a=fmtp:' + payloads[i]) === 0) {
					fmtpLineFound = true;
					lines[j] += ';' + fmtpStr;
				}
			}

			if (!fmtpLineFound) {

				for (let j = 0; j < lines.length; j++) {

					if (lines[j].indexOf('a=rtpmap:' + payloads[i]) === 0) {

						lines[j] += '\na=fmtp:' + payloads[i] + ' ' + fmtpStr;
					}
				}
			}
		}

		return lines.join('\n')
	}

	const createPeerConnection = (id, peerId, offer, candidates, iceServers) => {

		const peerConnectionConfig = {};

		if (instance.connectionConfig.iceServers) {

			// first priority using ice servers from local config.
			peerConnectionConfig.iceServers = instance.connectionConfig.iceServers;

			if (instance.connectionConfig.iceTransportPolicy) {

				peerConnectionConfig.iceTransportPolicy = instance.connectionConfig.iceTransportPolicy;
			}
		} else if (iceServers) {

			// second priority using ice servers from ome and force using TCP
			peerConnectionConfig.iceServers = [];

			for (let i = 0; i < iceServers.length; i++) {

				const iceServer = iceServers[i];

				const regIceServer = {};

				regIceServer.urls = iceServer.urls;

				let hasWebSocketUrl = false;
				const webSocketUrl = generateDomainFromUrl(instance.connectionUrl);

				for (let j = 0; j < regIceServer.urls.length; j++) {

					const serverUrl = regIceServer.urls[j];

					if (serverUrl.indexOf(webSocketUrl) > -1) {
						hasWebSocketUrl = true;
						break;
					}
				}

				if (!hasWebSocketUrl) {

					if (regIceServer.urls.length > 0) {

						const cloneIceServer = regIceServer.urls[0];
						const ip = findIp(cloneIceServer);

						if (webSocketUrl && ip) {
							regIceServer.urls.push(cloneIceServer.replace(ip, webSocketUrl));
						}
					}
				}

				regIceServer.username = iceServer.user_name;
				regIceServer.credential = iceServer.credential;

				peerConnectionConfig.iceServers.push(regIceServer);
			}

			peerConnectionConfig.iceTransportPolicy = 'relay';
		} else {
			// last priority using default ice servers.

			if (instance.iceTransportPolicy) {

				peerConnectionConfig.iceTransportPolicy = instance.iceTransportPolicy;
			}
		}

		console.info(logHeader, 'Create Peer Connection With Config', peerConnectionConfig);

		const peerConnection = new RTCPeerConnection(peerConnectionConfig);

		instance.peerConnection = peerConnection;

		// set local stream
		instance.stream.getTracks().forEach((track) => {

			console.info(logHeader, 'Add Track To Peer Connection', track);
			peerConnection.addTrack(track, instance.stream);
		});


		if (instance.connectionConfig.maxVideoBitrate) {

			// if bandwith limit is set. modify sdp from ome to limit acceptable bandwidth of ome
			offer.sdp = setBitrateLimit(offer.sdp, 'video', instance.connectionConfig.maxVideoBitrate);
		}

		if (instance.connectionConfig.sdp && instance.connectionConfig.sdp.appendFmtp) {

			offer.sdp = appendFmtp(offer.sdp);
		}

		peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
			.then(() => {

				peerConnection.createAnswer()
					.then((answer) => {

						if (instance.connectionConfig.sdp && instance.connectionConfig.sdp.appendFmtp) {

							answer.sdp = appendFmtp(answer.sdp);
						}

						peerConnection.setLocalDescription(answer)
							.then(() => {

								sendMessage(instance.webSocket, {
									id: id,
									peer_id: peerId,
									command: 'answer',
									sdp: answer
								});
							})
							.catch((error) => {

								console.error('peerConnection.setLocalDescription', error);
								errorHandler(error);
							});
					})
					.catch((error) => {

						console.error('peerConnection.createAnswer', error);
						errorHandler(error);
					});
			})
			.catch((error) => {

				console.error('peerConnection.setRemoteDescription', error);
				errorHandler(error);
			});

		if (candidates) {

			addIceCandidate(peerConnection, candidates);
		}

		peerConnection.onicecandidate = (e) => {

			if (e.candidate && e.candidate.candidate) {

				console.info(logHeader, 'Candidate Sent', '\n', e.candidate.candidate, '\n', e);

				sendMessage(instance.webSocket, {
					id: id,
					peer_id: peerId,
					command: 'candidate',
					candidates: [e.candidate]
				});
			}
		};

		peerConnection.oniceconnectionstatechange = (e) => {

			const state = peerConnection.iceConnectionState;

			if (instance.callbacks.iceStateChange) {

				console.info(logHeader, 'ICE State', '[' + state + ']');
				instance.callbacks.iceStateChange(state);
			}

			if (state === 'connected') {

				if (instance.callbacks.connected) {

					console.info(logHeader, 'Iceconnection Connected', e);
					instance.callbacks.connected(e);
				}
			}

			if (state === 'failed' || state === 'disconnected' || state === 'closed') {

				if (instance.callbacks.connectionClosed) {

					console.error(logHeader, 'Iceconnection Closed', e);
					instance.callbacks.connectionClosed('ice', e);
				}
			}
		}
	}

	const addIceCandidate = (peerConnection, candidates) => {

		for (let i = 0; i < candidates.length; i++) {

			if (candidates[i] && candidates[i].candidate) {

				const basicCandidate = candidates[i];

				peerConnection.addIceCandidate(new RTCIceCandidate(basicCandidate))
					.then(() => {

					})
					.catch((error) => {

						console.error('peerConnection.addIceCandidate', error);
						errorHandler(error);
					});
			}
		}
	}

	instance.startStreaming = (connectionUrl, connectionConfig) => {

		console.info(logEventHeader, 'Start Streaming');

		if (connectionConfig) {

			instance.connectionConfig = connectionConfig;
		}

		initWebSocket(connectionUrl);
	};

	instance.remove = () => {

		instance.removing = true;

		// first release peer connection with ome
		if (instance.peerConnection) {

			// remove tracks from peer connection
			instance.peerConnection.getSenders().forEach((sender) => {
				instance.peerConnection.removeTrack(sender);
			});

			instance.peerConnection.close();
			instance.peerConnection = null;
			delete instance.peerConnection;
		}

		// release video, audio stream
		if (instance.stream) {

			instance.stream.getTracks().forEach(track => {

				track.stop();
				instance.stream.removeTrack(track);
			});

			if (instance.videoElement) {
				instance.videoElement.srcObject = null;
			}

			instance.stream = null;
			delete instance.stream;
		}

		// release websocket
		if (instance.webSocket) {

			instance.webSocket.close();
			instance.webSocket = null;
			delete instance.webSocket;
		}

		instance.status = 'removed';

	};
}

// static methods
PublishStream.create = (options) => {

  const instance = {};

  instance.removing = false;

  initConfig(instance, options);
  addMethod(instance);

  return instance;
};

export default PublishStream;