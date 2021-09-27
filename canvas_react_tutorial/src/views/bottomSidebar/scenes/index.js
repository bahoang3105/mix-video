import SceneView from './SceneView';
import { connect, useDispatch } from 'react-redux';
import { getScenes } from '../../../redux/actions';
import { getListScene } from '../../../redux/selectors';
import { useEffect, useState } from 'react';

const Scenes = ({ scenes }) => {
  const [sceneSelect, setSceneSelect] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!scenes) {
      dispatch(getScenes());
    };
  });
  
  const changeSceneCss = scene => {
    setSceneSelect(scene);
  }
  
  const renderScenes = scenes => {
    if(!scenes) return;
    if(!sceneSelect) setSceneSelect(scenes[0].name);
    let listScene = [];
    for(let i = 0; i< scenes.length; i++) {
      listScene.push(<SceneView key={`${scenes[i].id}-view`} nameScene={scenes[i].name} img={scenes[i].img} changeSceneCss={changeSceneCss} onSelect={sceneSelect} id={scenes[i].num}/>);
    }
    return listScene;
  }

  return(
    <div className='list-scene'>
      {renderScenes(scenes)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  scenes: getListScene(state)
});

export default connect(mapStateToProps)(Scenes);