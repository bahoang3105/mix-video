import Video from "./Video";

const Videos = (props) => {
  const renderVideos = () => {
    if(!props.layers) return;
    const videoLayers = props.layers.filter(layer => (layer.type === 'camera' || layer.type === 'screen' || layer.type === 'youtube') && props.curScene === layer.scene);
    const listLayer = [];
    for(let i = 0; i < videoLayers.length; i++) {
      listLayer.push(
        <Video key={videoLayers[i].num} data={videoLayers[i]} onSelect={props.onSelect} curLayer={props.curLayer} />
      );
    }
    return listLayer;
  }
  return (
    <div className='content-videos'>
      {renderVideos()}
    </div>
  );
}

export default Videos;