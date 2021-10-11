import { connect } from "react-redux";
import General from "./rightField/general";
import { changeLayer } from "../../../redux/actions";
import Action from "./rightField/Action";
import Sound from "./rightField/Sound";

const Youtube = (props) => {
  const setValue = (type, value) => {
    if(type !== 'pause' && type !== 'start') {
      const checkValue = (value) ? value : 0;
      props.changeLayer(type, checkValue, props.data.num);
    } else {
      props.changeLayer(type, value, props.data.num);
    }
  }
  return (
    <div>
      <General data={props.data} setValue={setValue} />
      <Action data={props.data} setValue={setValue} />
      <Sound data={props.data} setValue={setValue} />
    </div>
  );
}

export default connect(
  null,
  { changeLayer }
)(Youtube);