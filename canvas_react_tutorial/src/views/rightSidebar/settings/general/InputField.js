import { useState } from "react";

const InputField = (props) => {
  const [valueField, setValueField] = useState(0);
  return (
    <div className='input-field'>
      <span className='name-field'>
        {props.nameField}
      </span>
      <input className='hidden-border' type='text' value={valueField} size='2' onChange={e => setValueField(e.target.value)} />
    </div>
  );
};

export default InputField;
