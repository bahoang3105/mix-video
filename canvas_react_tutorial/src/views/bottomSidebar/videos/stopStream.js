const stopStream = stream => {
  if(stream === null) return;
  stream.getTracks().forEach(track => track.stop());
}

export default stopStream;