import General from './rightField/general';
import Background from './rightField/Background';
import TextOfText from './rightField/Text';
import Font from './rightField/Font';
// import TextEffect from './rightField/textEffect';
import { connect } from 'react-redux';
import {
  changeLayer,
} from '../../../redux/actions';
import Align from './rightField/Align';
import { setValue } from '.';

const Text = (props) => {
  const setValueLayer = (type, value) => {
    setValue(type, value, props.changeLayer, props.data);
  }
  return (
    <div>
      <Align data={props.data.align} setValue={setValueLayer} />
      <General data={props.data} setValue={setValueLayer} />
      <Background data={props.data.background} setValue={setValueLayer} />
      <TextOfText data={props.data.text} setValue={setValueLayer} />
      <Font data={props.data} setValue={setValueLayer} />
      {/* <TextEffect data={props.data} setValue={setValueLayer} /> */}
    </div>
  );
}

export default connect(
  null,
  { changeLayer },
)(Text);