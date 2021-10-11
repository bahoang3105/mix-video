import YouTube from '@u-wave/react-youtube';
import logo from './youtube-logo-1539744426.jpg';

const YoutubeIframe = (props) => {
  const render = () => {
    if(props.data.start || props.data.autoplay) {
      return (
        <div style={{ opacity: props.data.opacity, zIndex: -1}} >
          <YouTube
            video="rw7PpYMO7Vo"
            autoplay={true}
            muted={props.data.mute}
            paused={props.data.pause}
            controls={false}
            showRelatedVideos={false}
            showInfo={false}
            modestBranding={true}
            width={props.data.width}
            height={props.data.height}
            volume={props.data.volume/100}
            loop={props.data.loop}
          />
        </div>
      );
    } else {
      return (
        <div style={{ opacity: props.data.opacity, zIndex: -1 }} >
          <img src={logo} height={props.data.height} alt='youtube-logo' width={props.data.width} />
        </div>
      );
    }
  }

  return (
    <div 
      style={{
        position: 'absolute',
        marginLeft: props.data.x + 'px',
        marginTop: props.data.y + 'px',
        zIndex: 0,
      }}
    >
      {render()}
    </div>
  );
}

export default (YoutubeIframe);