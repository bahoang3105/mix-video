import General from './rightField/general';
import Background from './rightField/Background';
import TextOfText from './rightField/Text';
import Font from './rightField/Font';
import TextEffect from './rightField/textEffect';
import { connect } from 'react-redux';
import {
  changeLayer,
} from '../../../redux/actions';
import Align from './rightField/Align';

const Text = (props) => {
  const setValue = (type, value) => {
    const checkValue = (value) ? value : 0;
    props.changeLayer(type, checkValue, props.data.num);
  }
  return (
    <div>
      <Align data={props.data.align} setValue={setValue} />
      <General data={props.data} setValue={setValue} />
      <Background data={props.data.background} setValue={setValue} />
      <TextOfText data={props.data.text} setValue={setValue} />
      <Font data={props.data} setValue={setValue} />
      <TextEffect data={props.data} setValue={setValue} />
    </div>
  );
}

export default connect(
  null,
  { changeLayer },
)(Text);