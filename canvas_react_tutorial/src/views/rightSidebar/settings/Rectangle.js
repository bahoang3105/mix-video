import { connect } from "react-redux";
import General from "./rightField/general";
import { changeLayer } from "../../../redux/actions";
import Background from './rightField/Background';
import Corner from "./rightField/Corner";
import { setValue } from ".";

const Rectangle = (props) => {
  const setValueLayer = (type, value) => {
    setValue(type, value, props.changeLayer, props.data);
  }
  return (
    <div>
      <General data={props.data} setValue={setValueLayer} />
      <Background data={props.data.background} setValue={setValueLayer} />
      <Corner data={props.data.cornerRadius} setValue={setValueLayer} />
    </div>
  );
}

export default connect(
  null,
  { changeLayer },
)(Rectangle);