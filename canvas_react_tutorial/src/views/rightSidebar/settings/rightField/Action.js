import { FiPlayCircle, FiPauseCircle } from 'react-icons/fi';
const Action = (props) => {
  const onSelectPlay = props.data.start ? (!props.data.pause ? ' on-select-play-pause' : '') : '';
  const onSelectPause = props.data.start ? (props.data.pause ? ' on-select-play-pause' : '') : '';
  
  const play = () => {
    if(!props.data.start) {
      props.setValue('start', true);
    } else if(props.data.pause) {
      props.setValue('pause', false);
    }
  }

  const pause = () => {
    if(!props.data.pause) {
      props.setValue('pause', true);
    }
  }

  return (
    <div className='right-field'>
      <div className='right-field-name'>
        Action
      </div>
      <div 
        className={`play-pause${onSelectPlay}`}
        onClick={play}
      >
        <span className='icon-play-pause'>
          <FiPlayCircle />
        </span>
        Play
      </div>
      <div className='autoplay-loop'>
        Autoplay
      </div>
      <label className="switch" id='autoplay'>
        <input type="checkbox" checked={props.data.autoplay} onChange={() => props.setValue('autoplay')}/>
        <span className="slider round"></span>
      </label>
      <div 
        className={`play-pause${onSelectPause}`}
        onClick={pause}
      >
        <span className='icon-play-pause'>
          <FiPauseCircle />
        </span>
        Pause
      </div>
      <div className='autoplay-loop'>
        Loop
      </div>
      <label className="switch" id='loop'>
        <input type="checkbox" checked={props.data.loop} onChange={() => props.setValue('loop')}/>
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default Action;