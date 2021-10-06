const getUserMedia = async (cameraId, microId) => {
  try {
    const constraints = (microId !== false && microId !== 'false') ? {
      video: {
        deviceId: cameraId,
      },
      audio: {
        deviceId: microId,
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      }
    } : {
      video: {
        deviceId: cameraId,
      },
      audio: false,
    };
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    console.log(err);
  }
};

export default getUserMedia;