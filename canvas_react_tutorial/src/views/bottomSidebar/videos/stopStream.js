const stopStream = stream => {
  stream.getTracks().forEach(track => track.stop());
}

export default stopStream;