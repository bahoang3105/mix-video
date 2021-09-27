import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getVideos } from "../../../redux/actions";
import { getListVideo } from "../../../redux/selectors";

const Videos = ({ videos }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(!videos) {
      dispatch(getVideos());
    };
  });

  const renderVideos = videos => {
    if(!videos) return 'hah';
    return 'hihihi';
  };

  return(
    <div className='list-video'>
      {renderVideos(videos)}
    </div>
  );
};

const mapStateToProps = state => ({
  videos: getListVideo(state)
});

export default connect(mapStateToProps)(Videos);