import SceneView from './SceneView';
import { connect, useDispatch } from 'react-redux';
import { getScenes } from '../../../redux/actions';
import { getCurScene, getListScene } from '../../../redux/selectors';
import { useEffect } from 'react';

const Scenes = ({ scenes, curScene }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(!scenes) {
      dispatch(getScenes());
    };
  });

  const renderScenes = scenes => {
    if(!scenes) return;
    const inactiveDelete = (scenes.length < 2) ? true : false
    const listScene = [];
    for(let i = 0; i < scenes.length; i++) {
      listScene.push(
        <SceneView
          key={`${scenes[i].num}-view`} 
          nameScene={scenes[i].name} 
          img={scenes[i].img} 
          onSelect={curScene} 
          id={scenes[i].num} 
          inactiveDelete={inactiveDelete}
        />
      );
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
  scenes: getListScene(state),
  curScene: getCurScene(state),
});

export default connect(mapStateToProps)(Scenes);