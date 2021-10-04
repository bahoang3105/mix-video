import { useEffect, useState } from "react";

const DropShadow = (props) => {
  const initColor = props.data.shadowColor;
  const [color, setColor] = useState(initColor);
  useEffect(() => {
    setColor(initColor);
  }, [initColor]);
  const display = props.data.dropShadow ? '' : ' hidden-effect';

  return (
    <div className='shadow-right'>
      <div className='animation-name' id='drop-shadow'>
        Drop Shadow
      </div>
      <label className="switch">
        <input type="checkbox" checked={props.data.dropShadow} onChange={() => props.setValue('dropShadow')}/>
        <span className="slider round"></span>
      </label>
      <div className={`input-color${display}`} id='shadow-input-color'>
        Color
        <input type='color' value={color} onChange={e => setColor(e.target.value)} className='input-color-grid'/>
        <div className='button-right-background shadow-button'>
          <span className='button-input-color' onClick={() => props.setValue('shadowColor', color)}>OK</span>
          <span className='button-input-color' onClick={() => props.setValue('shadowColor', '#ffffff')}>Clear</span>
        </div>
      </div>
    </div>
  );
}

export default DropShadow;