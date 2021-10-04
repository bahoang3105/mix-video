import {
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
} from 'react-icons/ai';

const Align = (props) => {
  const left = (props.data === 'left') ? ' on-select-align' : '';
  const center = (props.data === 'center') ? ' on-select-align' : '';
  const right = (props.data === 'right') ? ' on-select-align' : '';

  return (
    <div className='right-field'>
      <div id='align'>
        <div className={`button-align${left}`} onClick={() => props.setValue('align', 'left')}>
          <AiOutlineAlignLeft />
        </div>
        <div className={`button-align${center}`} onClick={() => props.setValue('align', 'center')}>
          <AiOutlineAlignCenter />
        </div>
        <div className={`button-align${right}`} onClick={() => props.setValue('align', 'right')}>
          <AiOutlineAlignRight />
        </div>
      </div>
    </div>
  );
}

export default Align;