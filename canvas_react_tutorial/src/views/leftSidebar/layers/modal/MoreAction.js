import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { RiPencilFill } from 'react-icons/ri';
import RenameModal from '../../../RenameModal';

const MoreAction = (props) => {
  const [show, setShow] = useState(false);

  const rename = (newName) => {
    props.renameFile(props.fileKey, newName);
  }
  const onClickDelete = () => {
    props.setDisplay(false);
    props.deleteFile(props.fileKey);
  }
  const onClickRename = () => {
    props.setDisplay(false);
    setShow(true);
  }

  return (
    <div 
      className={`more-action-grid${props.display ? '' : ' display-none'}`}
    >
      <div
        className='action'
        onClick={onClickDelete}
      >
          <AiFillDelete />
          &nbsp;&nbsp;Delete
      </div>
      <div 
        className='action'
        onClick={onClickRename}
      >
          <RiPencilFill />
          &nbsp;&nbsp;Rename
      </div>
      <RenameModal
        show={show}
        setShow={setShow}
        name={props.fileName}
        rename={rename}
      />
    </div>
  );
}

export default MoreAction;