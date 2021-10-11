import Text from './Text';

const TextButton = (props) => {
  return (
    <div onClick={() => props.addLayer('text')} style={{ cursor: 'pointer' }}>
      <Text name='Text' />
    </div>
  );
}

export default TextButton;