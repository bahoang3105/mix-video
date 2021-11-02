import React, { useEffect, useRef, useState } from 'react';
import Header from './views/headers';
import './css/app.css';
import LeftSidebar from './views/leftSidebar';
import Content from './views/content';
import BottomSidebar from './views/bottomSidebar';
import RightSidebar from './views/rightSidebar';

function App() {
  const [data, setData] = useState();
  const scenesRef = useRef(null);
  const [size, setSize] = useState({width: 0, height: 0});
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if(e.data.type !== 'webpackOk') {
        const data = JSON.parse(e.data);
        if(data.value) {
          console.log('Successfully connected!');
          localStorage.setItem('secretKey', data.value.secretKey);
          setData(data.value.secretKey);
        }
      }
    }, false);
  })

  useEffect(() => {
    if(data) {
      setSize({
        width: scenesRef.current.clientWidth-20, 
        height: scenesRef.current.clientHeight-20,
      });
    }
  }, [data]);

  if(!data) {
    return (
      <div/>
    );
  }

  return (
    <div>
      <Header setPublish={setPublish} />
      <div className='grid-container'>
        <div className='left-sidebar'>
          <LeftSidebar size={size}/>
        </div>
        <div id='bonus-space-left' />
        <div className='scenes' ref={scenesRef}>
          <Content size={size} publish={publish} />
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
