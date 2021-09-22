import React from 'react';
// import Canvas from './Canvas';
import Header from './views/headers';
import './css/app.css';
import LeftSidebar from './views/leftSidebar';
import Content from './views/content';
import BottomSidebar from './views/bottomSidebar';
import RightSidebar from './views/rightSidebar';

function App() {
  // const draw = (ctx, frameCount) => {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   ctx.fillStyle = '#000000';
    // ctx.beginPath();
    // ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
    // ctx.fill();

  //   ctx.fillRect(0, 0, 100*Math.sin(frameCount*0.05)**2, 100*Math.sin(frameCount*0.05)**2)
  // }
  // const options = {'context': '2d'};
  return (
    <div>
      <Header/>
      <div className='grid-container'>
        <div className='left-sidebar'>
          <LeftSidebar />
        </div>
        <div className='scenes'>
          <Content />
          <BottomSidebar />
        </div>
        <div className='right-sidebar'>
          <RightSidebar />
        </div>
      </div>
      {/* <Canvas draw={draw} options={options}/> */}
    </div>
  );
}

export default App;
