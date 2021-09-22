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
        <div className='scenes'>
          <Content />
          <BottomSidebar />
        </div>
        <div className='right-sidebar'>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
