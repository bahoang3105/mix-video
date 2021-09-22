import Canvas from "./Canvas";

const MainCanvas = () => {
  const draw = ctx => {
    ctx.canvas.height = 690;
    ctx.canvas.width = 1260;
    ctx.fillStyle = '#969ca5';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const image = new Image();
    image.src = 'https://app.gostudio.co/static/img/live-free.png';
    ctx.drawImage(image, 1170, 0, 90, 90);
  }

  const options = {'context': '2d'};
  return(
    <Canvas draw={draw} options={options}/>
  );
};

export default MainCanvas;
