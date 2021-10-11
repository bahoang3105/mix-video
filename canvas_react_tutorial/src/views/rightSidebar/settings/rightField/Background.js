import { useEffect, useState } from 'react';

const Background = (props) => {
  const initColor = (props.data === null) ? '#ffffff' : props.data;
  
  const [color, setColor] = useState(initColor);
  useEffect(() => {
    setColor(initColor);
  }, [initColor]);
  return (
    <div className='right-field'>
      <div className='input-color'>
        Color
        <input type='color' value={color} onChange={e => setColor(e.target.value)} id='input-color-grid'/>
      </div>
      <div className='right-field-name'>
        Background
      </div>
      <div className='button-right-background'>
        <span className='button-input-color' onClick={() => props.setValue('background', color)}>OK</span>
        <span className='button-input-color' onClick={() => props.setValue('background', null)}>Clear</span>
      </div>
    </div>
  );
}

export default Background;