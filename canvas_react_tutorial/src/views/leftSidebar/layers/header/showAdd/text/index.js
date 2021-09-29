import Text from './Text';

const TextButton = (props) => {
  return (
    <div onClick={() => props.addLayer('text')}>
      <Text name='Text' />
    </div>
  );
}

export default TextButton;