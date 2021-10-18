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
      case 'sepia': {
        const changedScene = {
          ...curSceneData,
          sepia: value/100,
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
            <SampleFilter name='None' opacity={1} brightness={1} contrast={1} saturate={1} blur={0} grayscale={0} sepia={0} template={curSceneData.template} />
            <SampleFilter name='Ancient' opacity={1} brightness={0.96} contrast={0.9} saturate={1} blur={0} grayscale={0.22} sepia={0.42} template={curSceneData.template} />
          </div>
          <div className='grid-filter'>
            <SampleFilter name='Colorful' opacity={1} brightness={1} contrast={1} saturate={2.5} blur={0} grayscale={0} sepia={0} template={curSceneData.template} />
            <SampleFilter name='Warm' opacity={1} brightness={1.35} contrast={1} saturate={1.7} blur={0} grayscale={0} sepia={0.45} template={curSceneData.template} />
          </div>
          <div className='grid-filter'>
            <SampleFilter name='Murky' opacity={1} brightness={0.7} contrast={1} saturate={1} blur={0} grayscale={0} sepia={0} template={curSceneData.template} />
            <SampleFilter name='Bright' opacity={1} brightness={1.2} contrast={1} saturate={1} blur={0} grayscale={0} sepia={0} template={curSceneData.template} />
          </div>
          <div className='grid-filter'>
            <SampleFilter name='Colorless' opacity={1} brightness={1} contrast={1} saturate={1} blur={0} grayscale={1} sepia={0} template={curSceneData.template} />
            <SampleFilter name='Dim' opacity={0.9} brightness={1} contrast={1} saturate={1} blur={3} grayscale={0} sepia={0} template={curSceneData.template} />
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
