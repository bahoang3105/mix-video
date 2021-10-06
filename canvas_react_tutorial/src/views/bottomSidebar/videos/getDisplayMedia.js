const getDisplayMedia = async () => {
  try {
    const constraints = {
      video: {
        cursor: "always"
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      }
    };
    return await navigator.mediaDevices.getDisplayMedia(constraints);
  } catch (err) {
    console.log(err);
  }
};

export default getDisplayMedia;