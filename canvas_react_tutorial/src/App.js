import React from 'react';
import Header from './views/headers';
import './css/app.css';
import LeftSidebar from './views/leftSidebar';
import Content from './views/content';
import BottomSidebar from './views/bottomSidebar';
import RightSidebar from './views/rightSidebar';

function App() {
  return (
    <div>
      <Header/>
      <div className='grid-container'>
        <div className='left-sidebar'>
          <LeftSidebar />
        </div>
        <div id='bonus-space-left' />
        <div className='scenes'>
          <Content />
          <BottomSidebar />
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
