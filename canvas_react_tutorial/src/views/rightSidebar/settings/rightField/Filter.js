import { connect } from "react-redux";
import { changeLayer } from "../../../../redux/actions";

const Filter = (props) => {
	const resetFilter = () => {

	}

	return (
		<div className='right-field'>
			<div className='right-field-name'>
				Filter
			</div>
			<div id='reset-filters' onClick={resetFilter}>
				Reset
			</div>
			<div className='filters'>
				<div className='filter'>
					<div className='name-filter'>
							Brightness
					</div>
					<input type='range' max='400' min='0' value={props.data.brightness*100} onChange={e => props.setValue('brightness', e.target.value)} />
					<span className='value-filter'>{props.data.brightness}</span>
				</div>
				<div className='filter'>
					<div className='name-filter'>
							Contrast
					</div>
					<input type='range' max='600' min='-200' value={props.data.contrast*100} onChange={e => props.setValue('contrast', e.target.value)} />
					<span className='value-filter'>{props.data.contrast}</span>
				</div>
				<div className='filter'>
					<div className='name-filter'>
							Saturation
					</div>
					<input type='range' max='400' min='0' value={props.data.saturate*100} onChange={e => props.setValue('saturate', e.target.value)} />
					<span className='value-filter'>{props.data.saturate}</span>
				</div>
				<div className='filter' style={{ borderBottom: 'none', paddingBottom : '0' }}>
					<div className='name-filter'>
							Blur
					</div>
					<input type='range' max='' min='' value={props.data.blur} onChange={e => props.setValue('blur', e.target.value)} />
					<span className='value-filter'>{props.data.blur}px</span>
				</div>
			</div>
		</div>
	);
}
  
export default connect(
	null,
	{ changeLayer }
)(Filter);