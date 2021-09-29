const Text = (props) => {
  return (
    <div className='right-field'>
      <div className='right-field-name'>
        Text
      </div>
      <textarea cols='33' rows='2' className='textarea-right' value={props.data} onChange={e => props.setValue('text', e.target.value)} />
    </div>
  );
}

export default Text;