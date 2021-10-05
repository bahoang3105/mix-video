import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getVideos } from "../../../redux/actions";
import { getListVideo } from "../../../redux/selectors";
import VideoView from "./VideoView";

const Videos = ({ videos }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(!videos) {
      dispatch(getVideos());
    };
  });

  const renderVideos = videos => {
    if(!videos) return;
    const listVideo = [];
    for(let i = 0; i < videos.length; i++) {
      listVideo.push(
        <VideoView
          key={`video-${videos[i].num}`}
          name={videos[i].name}
          info={videos[i].info}
        />
      );
    }
    return listVideo;
  };

  return(
    <div className='list-bottom'>
      {renderVideos(videos)}
    </div>
  );
};

const mapStateToProps = state => ({
  videos: getListVideo(state)
});

export default connect(mapStateToProps)(Videos);