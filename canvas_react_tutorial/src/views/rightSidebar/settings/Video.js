import { connect } from "react-redux";
import General from "./rightField/general";
import { changeLayer } from "../../../redux/actions";

const Video = (props) => {
  const setValue = (type, value) => {
    const checkValue = (value) ? value : 0;
    props.changeLayer(type, checkValue, props.data.num);
  }
  return (
    <div>
      <General data={props.data} setValue={setValue} />
    </div>
  );
}

export default connect(
  null,
  { changeLayer }
)(Video);