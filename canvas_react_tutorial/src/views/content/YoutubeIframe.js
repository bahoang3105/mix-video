import YouTube from '@u-wave/react-youtube';

export const keyYoutube = url => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}

const YoutubeIframe = (props) => {
  const zIndex = (props.curLayer === props.data.num) ? 10 : 0;
  const key = keyYoutube(props.data.src);
  const render = () => {
    if(props.data.start) {
      return (
        <div 
          style={{
            opacity: props.data.opacity,
            zIndex: -1,
            display: props.data.hidden ? 'none' : '',
          }} 
        >
          <YouTube
            video={key}
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
        <div style={{ opacity: props.data.opacity, zIndex: -1, display: props.data.hidden ? 'none' : '' }} >
          <img src={`https://img.youtube.com/vi/${key}/maxresdefault.jpg`} height={props.data.height} alt='youtube-logo' width={props.data.width} />
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
        zIndex: zIndex,
      }}
    >
      {render()}
    </div>
  );
}

export default YoutubeIframe;
