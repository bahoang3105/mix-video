import { useEffect, useMemo } from "react";

const useVideo = (stream) => {
  const video = useMemo(() => {
    return document.createElement('video');
  }, []);

  useEffect(() => {
    if (!stream) {
      return;
    }
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream, video]);
  return video;
};

export default useVideo;