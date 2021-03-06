import { connect } from "react-redux";
import General from "./rightField/general";
import { changeLayer } from "../../../redux/actions";
import Background from './rightField/Background';
import { setValue } from ".";

const Circle = (props) => {
  const setValueLayer = (type, value) => {
    setValue(type, value, props.changeLayer, props.data);
  }
  return (
    <div>
      <General data={props.data} setValue={setValueLayer} />
      <Background data={props.data.background} setValue={setValueLayer} />
    </div>
  );
}

export default connect(
  null,
  { changeLayer },
)(Circle);