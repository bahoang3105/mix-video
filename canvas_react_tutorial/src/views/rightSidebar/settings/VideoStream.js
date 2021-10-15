import { connect } from "react-redux";
import General from "./rightField/general";
import { changeLayer } from "../../../redux/actions";
import { setValue } from ".";
import Filter from "./rightField/Filter";

const VideoStream = (props) => {
  const setValueLayer = (type, value) => {
    setValue(type, value, props.changeLayer, props.data);
  }
  
  return (
    <div>
      <General data={props.data} setValue={setValueLayer} />
      <Filter data={props.data} setValue={setValueLayer} />
    </div>
  );
}

export default connect(
  null,
  { changeLayer }
)(VideoStream);