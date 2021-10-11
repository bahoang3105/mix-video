import {
  ImVolumeHigh,
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeMute,
  ImVolumeMute2,
} from 'react-icons/im';

const Sound = (props) => {
  const mute = props.data.mute ? '' : 'display-none';
  const noSound = props.data.mute ? 'display-none' : ((props.data.volume === 0) ? '' : 'display-none');
  const highSound = props.data.mute ? 'display-none' : ((props.data.volume >= 70) ? '' : 'display-none');
  const lowSound = props.data.mute ? 'display-none' : ((props.data.volume > 0 && props.data.volume <= 30) ? '' : 'display-none');
  const mediumSound = props.data.mute ? 'display-none' : ((props.data.volume > 30 && props.data.volume < 70) ? '' : 'display-none');
  
  return (
    <div className='right-field'>
      <div className={`sound ${mute}`} onClick={() => props.setValue('mute')}>
        <ImVolumeMute2 />
      </div>
      <div className={`sound ${noSound}`} onClick={() => props.setValue('mute')}>
        <ImVolumeMute />
      </div>
      <div className={`sound ${highSound}`} onClick={() => props.setValue('mute')}>
        <ImVolumeHigh />
      </div>
      <div className={`sound ${lowSound}`} onClick={() => props.setValue('mute')}>
        <ImVolumeLow />
      </div>
      <div className={`sound ${mediumSound}`} onClick={() => props.setValue('mute')}>
        <ImVolumeMedium />
      </div>
      <input type='range' className='input-volume' value={props.data.volume} max='100' min = '0'  onChange={e => props.setValue('volume', parseInt(e.target.value))} />
      <div className='right-field-name'>
        Sound
      </div>
    </div>
  );
}

export default Sound;