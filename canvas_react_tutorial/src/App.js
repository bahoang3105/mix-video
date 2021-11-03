import React, { useEffect, useRef, useState } from 'react';
import Header from './views/headers';
import './css/app.css';
import LeftSidebar from './views/leftSidebar';
import Content from './views/content';
import BottomSidebar from './views/bottomSidebar';
import RightSidebar from './views/rightSidebar';
import axios from 'axios';
import BaseUrl from './BaseUrl';

function App() {
  const [data, setData] = useState();
  const scenesRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [publish, setPublish] = useState(false);

  const [name, setName] = useState('');
  useEffect(() => {
    getNameStream();
  }, []);

  const getNameStream = async () => {
    try {
      const { data } = await axios.get(BaseUrl + '/app/getNameStream', {
        headers: {
          'secret-key': localStorage.getItem('secretKey'),
        }
      });
      setName(data.name);
    } catch (err) {
      console.error(err.response.data.message);
    }
  }

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if(e.data.type !== 'webpackOk') {
        if(e.data.value) {
          console.log('Successfully connected!');
          localStorage.setItem('secretKey', e.data.value.secretKey);
          setData(e.data.value);
        }
      }
    }, false);
  });

  useEffect(() => {
    if(data) {
      setSize({
        width: scenesRef.current.clientWidth, 
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
      <Header setPublish={setPublish} name={name} setName={setName} />
      <div className='grid-container'>
        <div className='left-sidebar'>
          <LeftSidebar size={size} callback={data.logInfo}/>
        </div>
        <div id='bonus-space-left' />
        <div className='scenes' ref={scenesRef}>
          <Content size={size} publish={publish} name={name} />
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
