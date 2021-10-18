import { useEffect, useState } from "react"

const usePreview = src => {
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = src;
    const onLoad = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = 1;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      setCanvas(canvas);
    };
    video.addEventListener('canplay', onLoad);
    return () => video.removeEventListener('load', onLoad);
  }, [src]);
  return canvas;
}

export default usePreview;