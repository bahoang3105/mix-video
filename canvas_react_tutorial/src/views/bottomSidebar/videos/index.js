import { connect } from "react-redux";
import { getListVideo } from "../../../redux/selectors";
import VideoView from "./VideoView";

const Videos = ({ videos }) => {
  const renderVideos = videos => {
    if(!videos) return;
    const listVideo = [];
    for(let i = 0; i < videos.length; i++) {
      listVideo.push(
        <VideoView
          key={`video-${videos[i].num}`}
          type={videos[i].type}
          name={videos[i].name}
          src={videos[i].src}
          id={videos[i].num}
          mute={videos[i].mute}
          onCamera={videos[i].onCamera}
          height={videos[i].height}
          width={videos[i].width}
        />
      );
    }
    return listVideo;
  };

  return(
    <div className='list-bottom' style={{ overflowX: videos.length > 6 ? 'scroll' : 'hidden' }}>
      {renderVideos(videos)}
    </div>
  );
};

const mapStateToProps = state => ({
  videos: getListVideo(state)
});

export default connect(mapStateToProps)(Videos);