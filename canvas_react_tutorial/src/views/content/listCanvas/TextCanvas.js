import Canvas from "../logo/Canvas";

const TextCanvas = ({ layer }) => {
  const draw = (ctx) => {
    ctx.canvas.height = (layer.h + layer.y > 690) ? 690 - layer.y : (layer.h + layer.y > 0) ? layer.h + layer.y : 0;
    ctx.canvas.width = (layer.w + layer.x > 1260) ? 1260 - layer.x : (layer.w + layer.x > 0) ? layer.w + layer.x : 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.rotate(layer.g * Math.PI / 180);
    if(layer.background !== 'none') {
      ctx.fillStyle = layer.background;
      ctx.fillRect(0, 0, layer.w, layer.h);
    }
    ctx.font = layer.fontSize + 'px ' + layer.fontFamily;
    ctx.textAlign = layer.textAlign;
    ctx.fillStyle = layer.fontColor;
    ctx.fillText(layer.text, 0, 20);
  }

  const options = {'context': '2d'};
  
  return (
    <Canvas
      draw={draw} 
      options={options} 
      className='canvas' 
      style={{position: 'absolute', left: (layer.x < 0) ? 293 : layer.x + 293, top: (layer.y < 0) ? 74 : layer.y + 74}}
    />
  );
}

export default TextCanvas;