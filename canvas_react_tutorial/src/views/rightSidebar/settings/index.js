import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getCurLayer } from "../../../redux/selectors";
import Genaral from "./general";

const Settings = ({ curLayer }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(curLayer === null) {
      dispatch(getCurLayer());
    };
  });

  const renderSettings = curLayer => {
    if(curLayer.length === 0) return;
    return(
      <div>
        <Genaral />
      </div>
    );
  }
  return(
    <div>
      {renderSettings(curLayer)}
    </div>
  );
};

const mapStateToProps = state => ({
  curLayer: getCurLayer(state),
});

export default connect(mapStateToProps)(Settings);