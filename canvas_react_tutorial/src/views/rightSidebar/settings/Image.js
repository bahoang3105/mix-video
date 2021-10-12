import { connect } from "react-redux";
import General from "./rightField/general";
import { changeLayer } from "../../../redux/actions";
import Flip from "./rightField/Flip";
import { setValue } from ".";

const Image = (props) => {
  const setValueLayer = (type, value) => {
    setValue(type, value, props.changeLayer, props.data);
  }
  return (
    <div>
      <General data={props.data} setValue={setValueLayer} />
      <Flip data={props.data.flip} setValue={setValueLayer} />
    </div>
  );
}

export default connect(
  null,
  { changeLayer },
)(Image);