const InputField = (props) => {
  return (
    <div className='input-field'>
      <span className='name-field'>
        {props.nameField}
      </span>
      <input className='hidden-border' type='text' value={props.value} size='2' onChange={e => props.setValue(props.nameField, e.target.value)} />
    </div>
  );
};

export default InputField;
