const Flip = (props) => {
  return (
    <div className='right-field'>
      <div className='right-field-name'>
        Flip
      </div>
      <label className="switch">
        <input type="checkbox" checked={props.data.flip} onChange={() => props.setValue('flip')}/>
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default Flip;