import { connect } from "react-redux";
import General from "./rightField/general";
import { changeLayer } from "../../../redux/actions";
import Flip from "./rightField/Flip";

const Image = (props) => {
  const setValue = (type, value) => {
    const checkValue = (value) ? value : 0;
    props.changeLayer(type, checkValue, props.data.num);
  }
  return (
    <div>
      <General data={props.data} setValue={setValue} />
      <Flip data={props.data.flip} setValue={setValue} />
    </div>
  );
}

export default connect(
  null,
  { changeLayer },
)(Image);