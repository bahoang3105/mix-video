import Image from './Image';

const ImageButton = (props) => {
  return (
    <div onClick={() => props.setShow(true)}>
      <Image name='Image' />
    </div>
  );
}

export default ImageButton;