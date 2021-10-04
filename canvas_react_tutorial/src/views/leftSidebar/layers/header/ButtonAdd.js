import { AiOutlinePlusCircle } from "react-icons/ai";
import ShowAdd from './showAdd';
import { useState } from 'react';
import ImageAdd from "../modal/ImageAdd";
const ButtonAdd = (props) => {
  const [displayAdd, setDisplayAdd] = useState(' none');
  const [showImage, setShowImage] = useState(false);
  

  return(
    <>
      <div
        id='left-add'
        onMouseOver={() => setDisplayAdd('')}
        onMouseOut={() => setDisplayAdd(' none')}
        onClick={() => setDisplayAdd(' none')}
      >
        <AiOutlinePlusCircle />
        <span className='space' />
        <ShowAdd 
          display={displayAdd} 
          curScene={props.curScene} 
          setShowImage={setShowImage}
        />
      </div>
      <ImageAdd curScene={props.curScene} show={showImage} setShow={setShowImage} />
    </>
  );
};

export default ButtonAdd;