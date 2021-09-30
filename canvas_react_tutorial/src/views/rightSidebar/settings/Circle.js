import { connect } from "react-redux";
import General from "./rightField/general";
import { changeLayer } from "../../../redux/actions";
import Background from './rightField/Background';

const Circle = (props) => {
  const setValue = (type, value) => {
    if(type === 'background') {
      if(value === 'none') {
        props.changeLayer('fill', '', props.data.num);
      }
      props.changeLayer('fill', value, props.data.num);
    }
    props.changeLayer(type, value, props.data.num);
  }
  return (
    <div>
      <General data={props.data} setValue={setValue} />
      <Background data={props.data.fill} setValue={setValue} />
    </div>
  );
}

export default connect(
  null,
  { changeLayer },
)(Circle);