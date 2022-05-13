navigator.mediaDevices.getDisplayMedia = async () => {
  // create MediaStream
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
      },
    },
  });

  return stream;
};