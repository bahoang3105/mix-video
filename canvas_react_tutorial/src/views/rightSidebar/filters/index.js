import SampleFilter from "./SampleFilter";
import Filter from './Filter';
import { getCurScene, getListScene } from "../../../redux/selectors";
import { connect } from "react-redux";
import { changeScene } from "../../../redux/actions";

const Filters = ({ display, curScene, scenes, changeScene }) => {
  const curSceneData = curScene ? scenes.find(scene => scene.num === curScene) : [];
  
  const setValue = (type, value) => {
    switch (type) {
      case 'contrast': {
        const changedScene = {
          ...curSceneData,
          contrast: value/100,
        };
        changeScene(changedScene, curScene, type);
        break;
      }
      case 'blur': {
        const changedScene = {
          ...curSceneData,
          blur: value/4,
        };
        changeScene(changedScene, curScene, type);
        break;
      }
      case 'brightness': {
        const changedScene = {
          ...curSceneData,
          brightness: value/100,
        };
        changeScene(changedScene, curScene, type);
        break;
      }
      case 'saturate': {
        const changedScene = {
          ...curSceneData,
          saturate: value/100,
        };
        changeScene(changedScene, curScene, type);
        break;
      }
      case 'opacity': {
        const changedScene = {
          ...curSceneData,
          opacity: value/100,
        };
        changeScene(changedScene, curScene, type);
        break;
      }
      case 'grayscale': {
        const changedScene = {
          ...curSceneData,
          grayscale: value/100,
        };
        changeScene(changedScene, curScene, type);
        break;
      }
      default:
        break;
    }
  }

  const renderConfig = () => {
    if(curSceneData.length === 0) {
      return;
    }
    return <Filter data={curSceneData} setValue={setValue} />;
  }

  return(
    <div style={{ display: display ? '' : 'none' }}>
      <div className='right-field'>
        <div className='right-field-name'>
          Template
        </div>
        <div id='filters-template'>
          <div className='grid-filter'>
            <SampleFilter name='none'/>
            <SampleFilter name='aaaa'/>
          </div>
          <div className='grid-filter'>
            <SampleFilter name='none'/>
            <SampleFilter name='aaaa'/>
          </div>
          <div className='grid-filter'>
            <SampleFilter name='none'/>
            <SampleFilter name='aaaa'/>
          </div>
          <div className='grid-filter'>
            <SampleFilter name='none'/>
            <SampleFilter name='aaaa'/>
          </div>
        </div>
      </div>
      <div className='right-field'>
        <div className='right-field-name'>
          More config
        </div>
        {renderConfig()}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  curScene: getCurScene(state),
  scenes: getListScene(state),
});

export default connect(
  mapStateToProps,
  { changeScene }
)(Filters);
