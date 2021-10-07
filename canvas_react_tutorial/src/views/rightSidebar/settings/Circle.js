import { connect } from "react-redux";
import General from "./rightField/general";
import { changeLayer } from "../../../redux/actions";
import Background from './rightField/Background';

const Circle = (props) => {
  const setValue = (type, value) => {
    const checkValue = (value) ? value : 0;
    props.changeLayer(type, checkValue, props.data.num);
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