import React, { useEffect, useRef, useState } from 'react';
import Header from './views/headers';
import './css/app.css';
import LeftSidebar from './views/leftSidebar';
import Content from './views/content';
import BottomSidebar from './views/bottomSidebar';
import RightSidebar from './views/rightSidebar';

function App() {
  const scenesRef = useRef(null);
  const [size, setSize] = useState({width: 0, height: 0});
  useEffect(() => {
    setSize({
      width: scenesRef.current.clientWidth < 700 ? 700 : scenesRef.current.clientWidth, 
      height: scenesRef.current.clientHeight < 500 ? 500 : scenesRef.current.clientHeight,
    });
  }, [setSize])
  return (
    <div>
      <Header/>
      <div className='grid-container'>
        <div className='left-sidebar'>
          <LeftSidebar />
        </div>
        <div id='bonus-space-left' />
        <div className='scenes' ref={scenesRef}>
          <Content size={size}/>
          <BottomSidebar size={size} />
        </div>
        <div id='bonus-space-right' />
        <div className='right-sidebar'>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
