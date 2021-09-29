import Image from './Image';

const ImageButton = (props) => {
  return (
    <div onClick={() => props.addLayer('image')}>
      <Image name='Image' />
    </div>
  );
}

export default ImageButton;