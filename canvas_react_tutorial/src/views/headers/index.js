import React from 'react';
import Logo from './Logo';
import NameStream from './NameStream';
import StartLiveButton from './StartLiveButton';
import '../../css/header.css';


const Header = (props) => {
  return (
    <div className='header'>
      <Logo className='main-logo'/>
      <NameStream className='name-stream'/>
      <StartLiveButton className='start-live-button' setPublish={props.setPublish}/>
    </div>
  )
}

export default Header;