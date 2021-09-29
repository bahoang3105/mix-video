import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getCurLayer } from "../../../redux/selectors";
import Text from './Text';

const Settings = ({ curLayer }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(curLayer === null) {
      dispatch(getCurLayer());
    };
  });

  const renderSettings = curLayer => {
    if(curLayer.length === 0) return;
    if(curLayer.type === 'text') {
      return (
        <Text data={curLayer} />
      );
    }
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