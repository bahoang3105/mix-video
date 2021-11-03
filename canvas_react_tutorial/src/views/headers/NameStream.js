import axios from 'axios';
import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import BaseUrl from '../../BaseUrl';

const NameStream = ({ name, setName, ...props }) => {
  const [display, setDisplay] = useState(true);
  const [inputName, setInputName] = useState(name);

  const allowChangeName = async () => {
    setName(inputName);
    await axios.post(BaseUrl + '/app/updateName', { newName: inputName }, {
      headers: {
        'secret-key': localStorage.getItem('secretKey'),
      }
    })
    setDisplay(!display);
  }

  const deniChangeName = () => {
    setInputName(name);
    setDisplay(!display);
  }

  return (
    <div>
      <div className={props.className} style={{ display: display ? 'flex' : 'none' }}>
        <span id='name-stream'>{name}</span>
        <span className='space' />
        <p className='button-change-name' onClick={() => setDisplay(!display)}>
          <AiFillEdit />
        </p>
      </div>
      <div style={{ display: display ? 'none' : 'flex' }}>
        <input className='input-name' type='text' value={inputName} onChange={e => setInputName(e.target.value)}></input> 
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className='change-name' 
          id="img" 
          viewBox="0 0 16 16" 
          fill="none"
          onClick={() => allowChangeName()}
        >
          <path
            fillRule="evenodd" 
            clipRule="evenodd"
            d="M0.800049 7.9998C0.800049 4.02647 4.02672 0.799805 8.00005 0.799805C11.9734 0.799805 15.2 4.02647 15.2 7.9998C15.2 11.9731 11.9734 15.1998 8.00005 15.1998C4.02672 15.1998 0.800049 11.9731 0.800049 7.9998ZM11.8466 6.45682C12.0468 6.26511 12.0517 5.94944 11.8576 5.75174C11.6635 5.55404 11.3439 5.54918 11.1437 5.74089L6.68932 10.007L4.8563 8.25147C4.65614 8.05977 4.33652 8.06462 4.14242 8.26232C3.94832 8.46002 3.95323 8.7757 4.1534 8.96741L6.33787 11.0596C6.53369 11.2471 6.84494 11.2471 7.04077 11.0596L11.8466 6.45682Z"
            fill="#00D254"
          />
        </svg>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className='change-name' 
          viewBox="0 0 16 16" 
          fill="none"
          onClick={() => deniChangeName()}
        >
          <circle 
            cx="8.00008" 
            cy="8.00033" 
            r="7.33333" 
            fill="#979DA5"
          />
          <path 
            d="M8.54681 8.00985L10.8242 5.72533C10.97 5.57912 10.97 5.32325 10.8242 5.17704C10.6785 5.03083 10.4234 5.03083 10.2777 5.17704L8.00023 7.46157L5.7228 5.17704C5.57704 5.03083 5.32197 5.03083 5.17621 5.17704C5.03046 5.32325 5.03046 5.57912 5.17621 5.72533L7.45364 8.00985L5.17621 10.2761C5.03046 10.4223 5.03046 10.6782 5.17621 10.8244C5.24909 10.8975 5.35841 10.934 5.4495 10.934C5.5406 10.934 5.64992 10.8975 5.7228 10.8244L8.00023 8.53986L10.2777 10.8244C10.3505 10.8975 10.4599 10.934 10.551 10.934C10.6421 10.934 10.7514 10.8975 10.8242 10.8244C10.97 10.6782 10.97 10.4223 10.8242 10.2761L8.54681 8.00985Z" 
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default NameStream;
