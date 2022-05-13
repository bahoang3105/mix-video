import React, { useEffect, useRef, useState } from 'react';
import Header from './views/headers';
import './css/app.css';
import LeftSidebar from './views/leftSidebar';
import Content from './views/content';
import BottomSidebar from './views/bottomSidebar';
import RightSidebar from './views/rightSidebar';
import axios from 'axios';
import smalltalk from 'smalltalk';

function App() {
  const [data, setData] = useState();
  const scenesRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [publish, setPublish] = useState(false);
  const [publishDone, setPublishDone] = useState(false);
  const [name, setName] = useState('');

  const checkLogin = async (entered) => {
    try{
      const secretKeySaved = localStorage.getItem('secretKey');
      const secretKey = secretKeySaved ? secretKeySaved : await smalltalk.prompt(entered ? 'Invalid key, please try again' : 'Please enter the secret key', 'Secret Key:', '');
      let check = await fetch(process.env.API_URL + '/app/verifyKey', {
        method: 'GET',
        headers: {
          'secret-key': secretKey,
        },
      });
      if (check.status === 200) {
        localStorage.setItem('secretKey', secretKey);
        setData(secretKey);
      } else {
        localStorage.removeItem('secretKey');
        await checkLogin(true);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    checkLogin();
    getNameStream();
  }, []);

  const getNameStream = async () => {
    try {
      const { data } = await axios.get(process.env.API_URL + '/app/getNameStream', {
        params: {
          liveId: localStorage.getItem('liveId'),
        }
      });
      setName(data.name);
    } catch (err) {
      console.error(err.response.data.message);
    }
  }

  useEffect(() => {
    if (data) {
      setSize({
        width: scenesRef.current.clientWidth,
        height: scenesRef.current.clientHeight - 20,
      });
    }
  }, [data]);

  if (!data) {
    return (
      <div />
    );
  }

  return (
    <div>
      <Header name={name} setName={setName} publish={publish} setPublish={setPublish} setPublishDone={setPublishDone} />
      <div className='grid-container'>
        <div className='left-sidebar'>
          <LeftSidebar size={size} />
        </div>
        <div id='bonus-space-left' />
        <div className='scenes' ref={scenesRef}>
          <Content size={size} name={name} publish={publish} publishDone={publishDone} />
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
