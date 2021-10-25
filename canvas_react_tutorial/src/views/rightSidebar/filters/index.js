import SampleFilter from "./SampleFilter";
import Filter from './Filter';
import { getCurScene, getListScene } from "../../../redux/selectors";
import { connect } from "react-redux";
import { changeScene } from "../../../redux/actions";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { useState } from "react";

const Filters = ({ display, curScene, scenes, changeScene }) => {
  const curSceneData = curScene ? scenes.find(scene => scene.num === curScene) : [];
  
  const [displayConfig, setDisplayConfig] = useState(false);

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
          blur: value/4*3,
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
      case 'grayscale': {
        const changedScene = {
          ...curSceneData,
          grayscale: !curSceneData.grayscale,
        };
        changeScene(changedScene, curScene, type);
        break;
      }
      case 'red': {
        const changedScene = {
          ...curSceneData,
          red: parseInt(value),
        }
        changeScene(changedScene, curScene, type);
        break;
      }
      case 'green': {
        const changedScene = {
          ...curSceneData,
          green: parseInt(value),
        }
        changeScene(changedScene, curScene, type);
        break;
      }
      case 'blue': {
        const changedScene = {
          ...curSceneData,
          blue: parseInt(value),
        }
        changeScene(changedScene, curScene, type);
        break;
      }
      case 'alpha': {
        const changedScene = {
          ...curSceneData,
          alpha: value/100,
        }
        changeScene(changedScene, curScene, type);
        break;
      }
      default:
        break;
    }
  }

  const renderConfig = () => {
    if(curSceneData.length === 0 || !displayConfig) {
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
            <SampleFilter name='None' brightness={1} contrast={1} saturate={1} blur={0} grayscale={0} sepia={0} boolGray={false} red={0} green={0} blue={0} alpha={0} template={curSceneData.template} />
            <SampleFilter name='Ancient' brightness={0.96} contrast={0.9} saturate={1} blur={0} grayscale={0.22} sepia={0.42} boolGray={false} red={82} green={79} blue={50} alpha={0.3} template={curSceneData.template} />
          </div>
          <div className='grid-filter'>
            <SampleFilter name='Colorful' brightness={1} contrast={1} saturate={2.5} blur={0} grayscale={0} sepia={0} boolGray={false} red={0} green={0} blue={0} alpha={0} template={curSceneData.template} />
            <SampleFilter name='Warm' brightness={1.35} contrast={1} saturate={1.7} blur={0} grayscale={0} sepia={0.45} boolGray={false} red={255} green={200} blue={48} alpha={0.2} template={curSceneData.template} />
          </div>
          <div className='grid-filter'>
            <SampleFilter name='Murky' brightness={0.8} contrast={1} saturate={1} blur={0} grayscale={0} sepia={0} boolGray={false} red={0} green={0} blue={0} alpha={0} template={curSceneData.template} />
            <SampleFilter name='Bright' brightness={1.2} contrast={1} saturate={1} blur={0} grayscale={0} sepia={0} boolGray={false} red={0} green={0} blue={0} alpha={0} template={curSceneData.template} />
          </div>
          <div className='grid-filter'>
            <SampleFilter name='Colorless' brightness={1} contrast={1} saturate={1} blur={0} grayscale={1} sepia={0} boolGray={true} red={0} green={0} blue={0} alpha={0} template={curSceneData.template} />
            <SampleFilter name='Dim' brightness={1} contrast={1} saturate={1} blur={3} grayscale={0} sepia={0} boolGray={false} red={0} green={0} blue={0} alpha={0} template={curSceneData.template} />
          </div>
        </div>
      </div>
      <div className='right-field'>
        <div className='right-field-name' onClick={() => setDisplayConfig(!displayConfig)} style={{ cursor: 'pointer' }}>
          <div className='more-config-dropdown'>
            <AiOutlineDown style={{ display: displayConfig ? '' : 'none'}} />
            <AiOutlineRight style={{ display: displayConfig ? 'none' : '' }} />
          </div>
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
