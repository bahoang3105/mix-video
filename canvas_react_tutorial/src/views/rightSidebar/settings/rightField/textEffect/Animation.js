import {
  ImArrowLeft,
  ImArrowRight,
} from 'react-icons/im';

const Animation = (props) => {
  const display = props.data.animation ? '' : ' hidden-effect';
  const left = (props.data.direction === 'left') ? ' on-select-align' : '';
  const right = (props.data.direction === 'right') ? ' on-select-align' : '';
  const decreaseSpeed = () => {
    if(props.data.speed - 0.5 > 0) {
      props.setValue('speed', props.data.speed - 0.5);
    }
  }

  return (
    <div className='animation-right'>
      <div className='animation-name'>
        Animation
      </div>
      <label className="switch">
        <input type="checkbox" checked={props.data.animation} onChange={() => props.setValue('animation')}/>
        <span className="slider round"></span>
      </label>
      <div className={`${display}`}>
        <div id='setting-speed'>
          <div className={`crease-speed${left}`} onClick={() => props.setValue('direction', 'left')}>
            <ImArrowLeft />
          </div>
          <div className={`crease-speed${right}`} onClick={() => props.setValue('direction', 'right')}>
            <ImArrowRight />
          </div>
          <div className='input-corner' id='input-speed'>
          <p className='plus-minus plus' onClick={() => props.setValue('speed', props.data.speed + 0.5)}>+</p>
          <div className='input-button'>
            Speed
          </div>
          <input id='input-value-speed' type='text' size='1' value={props.data.speed} onChange={e => props.setValue('speed', e.target.value)} />
          <p className='plus-minus minus' onClick={decreaseSpeed}>-</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Animation;