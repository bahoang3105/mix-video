import React from 'react';
import useCanvas from './useCanvas';

const Canvas = props => {
  const { draw, options, ...rest } = props;
  const { context } = options;
  const canvasRef = useCanvas(draw, {context});
 
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas;