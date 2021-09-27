import { connect } from 'react-redux';
import Text from './Text';
import { addLayer } from '../../../../../../redux/actions';

const TextButton = (props) => {
  const addTextLayer = () => {
    props.addLayer('text', props.curScene);
  }
  return (
    <div onClick={addTextLayer}>
      <Text name='Text' />
    </div>
  );
}

export default connect(
  null,
  { addLayer }
)(TextButton);