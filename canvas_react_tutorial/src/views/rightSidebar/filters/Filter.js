const Filter = (props) => {
	return (
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
			<div className='filter'>
				<div className='name-filter'>
						Blur
				</div>
				<input type='range' max='100' min='0' value={props.data.blur*4} onChange={e => props.setValue('blur', e.target.value)} />
				<span className='value-filter'>{props.data.blur.toFixed(2)}</span>
			</div>
			<div className='filter'>
				<div className='name-filter'>
						Opacity
				</div>
				<input type='range' max='100' min='0' value={props.data.opacity*100} onChange={e => props.setValue('opacity', e.target.value)} />
				<span className='value-filter'>{props.data.opacity}</span>
			</div>
			<div className='filter'>
				<div className='name-filter'>
						Grayscale
				</div>
				<input type='range' max='100' min='0' value={props.data.grayscale*100} onChange={e => props.setValue('grayscale', e.target.value)} />
				<span className='value-filter'>{props.data.grayscale} </span>
			</div>
		</div>
	);
}


export default Filter;