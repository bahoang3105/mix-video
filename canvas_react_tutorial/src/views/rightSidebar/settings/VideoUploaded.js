import { connect } from "react-redux";
import General from "./rightField/general";
import { changeLayer } from "../../../redux/actions";
import Action from "./rightField/Action";
import Sound from "./rightField/Sound";
import { setValue } from ".";
import Filter from "./rightField/Filter";

const VideoUploaded = (props) => {
  const setValueLayer = (type, value) => {
    setValue(type, value, props.changeLayer, props.data);
  }
  return (
    <div>
      <General data={props.data} setValue={setValueLayer} />
      <Action data={props.data} setValue={setValueLayer} />
      <Sound data={props.data} setValue={setValueLayer} />
      <Filter data={props.data} setValue={setValueLayer} />
    </div>
  );
}

export default connect(
  null,
  { changeLayer }
)(VideoUploaded);