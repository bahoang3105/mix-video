import General from './rightField/general';
import Background from './rightField/Background';
import TextOfText from './rightField/Text';
import Font from './rightField/font';
import TextEffect from './rightField/textEffect';
import { connect } from 'react-redux';
import {
  changeLayer,
} from '../../../redux/actions';

const Text = (props) => {
  const setValue = (type, value) => {
    props.changeLayer(type, value, props.data.num);
  }
  return (
    <div>
      <General data={props.data} setValue={setValue} />
      <Background data={props.data.background} setValue={setValue} />
      <TextOfText data={props.data.text} setValue={setValue} />
      <Font data={props.data} />
      <TextEffect data={props.data} />
    </div>
  );
}

export default connect(
  null,
  { changeLayer },
)(Text);