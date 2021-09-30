import Canvas from "./Canvas";

const Logo = () => {
  const draw = (ctx, frameCount) => {
    ctx.canvas.height = 200;
    ctx.canvas.width = 200;
    const image = new Image();
    image.src = 'https://app.gostudio.co/static/img/live-free.png';
    ctx.setTransform(1, 0, 0, 1, 130, 90);
    ctx.rotate(30 * Math.sin(frameCount*0.05) * (Math.PI / 180));
    ctx.drawImage(image, -38, 0, 90, 90);
  }

  const options = {'context': '2d'};
  return (
    <Canvas draw={draw} options={options} className='canvas-logo'/>
  );
}

export default Logo;
