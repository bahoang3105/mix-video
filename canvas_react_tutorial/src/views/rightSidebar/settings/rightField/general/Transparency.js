const Transparency = (props) => {
  return (
    <div className='right-field'>
      <div className='right-field-name'>
        Transparency - {Math.round(props.value)}
      </div>
      <input
        type='range' 
        value={props.value} 
        max='100' 
        min='0' 
        onChange={e => {props.setValue('transparency', e.target.value)} }
        className='input-range'
      />
    </div>
  );
}

export default Transparency;