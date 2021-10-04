import { useEffect, useState } from "react";
import { 
  BiBold,
  BiItalic,
  BiUnderline, 
} from 'react-icons/bi';

const Font = (props) => {
  const fontFamily = ['Arial', 'Calibri'];
  const bold = (props.data.style.findIndex(style => style === 'bold') < 0) ? '' : ' on-select-align';
  const italic = (props.data.style.findIndex(style => style === 'italic') < 0) ? '' : ' on-select-align';
  const underline = (props.data.textDecoration === 'none') ? '' : ' on-select-align';
  const [color, setColor] = useState(props.data.fontColor);
  useEffect(() => {
    setColor(props.data.fontColor);
  }, [props.data.fontColor]);

  const renderFont = () => {
    const listFontFamily = [];
    for(let i = 0; i < fontFamily.length; i++) {
      if(fontFamily[i] === props.data.fontFamily) {
        listFontFamily.push(
          <option key={fontFamily[i]} value={fontFamily[i]} defaultValue onClick={() => console.log(i)}>{fontFamily[i]}</option>
        );
      } else {
        listFontFamily.push(
          <option key={fontFamily[i]} value={fontFamily[i]} onClick={() => console.log(i)}>{fontFamily[i]}</option>
        );
      }
    }
    return listFontFamily;
  }

  return (
    <div className='right-field'>
      <div className='right-field-name'>
        Font
      </div>
      <div className='row-font'>
        <select className="font-family" onChange={e => props.setValue('fontFamily', e.target.value)}>
          {renderFont()}
        </select>
        <div className='input-corner' id='input-size'>
          <p className='plus-minus plus' onClick={() => props.setValue('fontSize', props.data.fontSize + 1)}>+</p>
          <div className='input-button'>
            Size
          </div>
          <input id='input-value-corner' type='text' size='1' value={props.data.fontSize} onChange={e => props.setValue('fontSize', e.target.value)} />
          <p className='plus-minus minus' onClick={() => props.setValue('fontSize', props.data.fontSize - 1)}>-</p>
        </div>
      </div>
      <div className='row-font'>
        <div id='font-style'>
          <div className={`font-style${bold}`} id='bold' onClick={() => props.setValue('fontStyle', 'bold')}>
            <BiBold />
          </div>
          <div className={`font-style${italic}`} id='italic' onClick={() => props.setValue('fontStyle', 'italic')}>
            <BiItalic />
          </div>
          <div className={`font-style${underline}`} id='underline' onClick={() => props.setValue('textDecoration', 'underline')}>
            <BiUnderline />
          </div>
        </div>
        <div className='input-color' id='font-input-color'>
          Color
          <input type='color' value={color} onChange={e => setColor(e.target.value)} id='input-color-grid'/>
        </div>
        <div className='button-right-background' id='button-color-font'>
          <span className='button-input-color' onClick={() => props.setValue('fontColor', color)}>OK</span>
          <span className='button-input-color' onClick={() => props.setValue('fontColor', '#ffffff')}>Clear</span>
        </div>
      </div>
    </div>
  );
}

export default Font;