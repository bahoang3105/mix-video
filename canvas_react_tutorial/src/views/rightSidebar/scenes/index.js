import Scene from "./Scene";
import { connect, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getScenes } from '../../../redux/actions';
import { getListScene } from '../../../redux/selectors';

const Scenes = ({ scenes, display }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(!scenes) {
      dispatch(getScenes());
    };
  });

  const renderScenes = scenes => {
    if(!scenes) return;
    let listScene = [];
    for(let i = 0; i < scenes.length; i++) {
      listScene.push(<Scene key={scenes[i].name} name={scenes[i].name} />)
    }
    return listScene;
  }

  return(
    <div style={{ display: display ? 'block' : 'none' }}>
      <label className='select-all'>
        Select All
      </label>
      {renderScenes(scenes)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  scenes: getListScene(state)
});

export default connect(mapStateToProps)(Scenes);
