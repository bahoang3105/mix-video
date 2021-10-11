const InputField = (props) => {
  return (
    <div className='input-field'>
      <span className='name-field' style={{ cursor: 'default' }}>
        {props.nameField}
      </span>
      <input className='hidden-border' type='text' value={props.value} size='2' onChange={e => props.setValue(props.nameField, e.target.value)} disabled={props.lock} />
    </div>
  );
};

export default InputField;
