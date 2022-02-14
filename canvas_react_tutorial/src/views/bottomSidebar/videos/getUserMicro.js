const getUserMicro = async (microId) => {
  try {
    const constraints = {
      audio: {
        deviceId: microId,
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      }
    };
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    console.error(err);
    alert('We need your permission to use the microphone!');
  }
};

export default getUserMicro;