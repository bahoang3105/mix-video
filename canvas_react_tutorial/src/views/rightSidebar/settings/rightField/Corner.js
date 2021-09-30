import { GiCornerFlag } from 'react-icons/gi';

const Corner = (props) => {
  return (
    <div className='right-field'>
      <div className='input-corner'>
        <p className='plus-minus' id='plus' onClick={() => props.setValue('corner', props.data + 1)}>+</p>
        <div id='icon-input-corner'>
          <GiCornerFlag />
        </div>
        <input id='input-value-corner' type='text' size='1' value={props.data} onChange={e => props.setValue('corner', e.target.value)} />
        <p className='plus-minus' id='minus' onClick={() => props.setValue('corner', props.data - 1)}>-</p>
      </div>
      <div className='right-field-name'>
        Corner
      </div>
      <span id='corner-unit'>px</span>
    </div>
  );
}

export default Corner;