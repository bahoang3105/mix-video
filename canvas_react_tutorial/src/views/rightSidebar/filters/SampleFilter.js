import Picture from './sampleFilter.jpg';
import { changeScene } from '../../../redux/actions';
import { getCurScene, getListScene } from '../../../redux/selectors';
import { connect } from 'react-redux';

const SampleFilter = ({ curScene, scenes, ...props}) => {
  const isSelect = props.template === props.name;
  const changeTemplate = () => {
    const curSceneData = scenes.find(scene => scene.num === curScene);
    const changedScene = {
      ...curSceneData,
      template: props.name,
      blur: props.blur,
      brightness: props.name === 'Warm' ? 1.15 : props.brightness,
      contrast: props.contrast,
      saturate: props.saturate,
      grayscale: props.boolGray,
      red: props.red,
      green: props.green,
      blue: props.blue,
      alpha: props.alpha,
    };
    props.changeScene(changedScene, curScene);
  }

	return (
		<div className='template'>
			<div className={`template-name${isSelect ? ' select-template-name' : ''}`}>
				{props.name}
			</div>
			<div 
				style={{ 
					filter: `brightness(${props.brightness}) contrast(${props.contrast}) blur(${props.blur}px) saturate(${props.saturate}) grayscale(${props.grayscale}) sepia(${props.sepia})`,
          opacity: props.opacity,
        }}
        onClick={changeTemplate}
      >
				<img src={Picture} alt='sample-filter' draggable={false} className={`sample-filter${isSelect ? ' select-template' : ''}`} />
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
  curScene: getCurScene(state),
  scenes: getListScene(state),
})

export default connect(
  mapStateToProps,
  { changeScene }
)(SampleFilter);