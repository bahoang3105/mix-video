import { useEffect, useMemo } from "react";
import flvjs from 'flv.js';

const useRTMP = (stream) => {
  const video = useMemo(() => {
    return document.createElement('video');
  }, []);

  useEffect(() => {
    if (!stream) {
      return;
    }
    const streamParams = stream.split('/');
    const room = streamParams[3];
    const nameStream = streamParams[4];
    const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: `http://localhost:8008/${room}/${nameStream}.flv`,
    });
    flvPlayer.attachMediaElement(video);
    flvPlayer.load();
    video.onloadedmetadata = () => {
      video.muted = true;
      video.play();
    };
  }, [stream, video]);
  return video;
};

export default useRTMP;