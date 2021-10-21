const Filter = (props) => {
	return (
		<div className='filters'>
			<div className='filter'>
				<div className='name-filter'>
						Brightness
				</div>
				<input type='range' max='200' min='0' value={props.data.brightness*100} onChange={e => props.setValue('brightness', e.target.value)} />
				<span className='value-filter'>{props.data.brightness}</span>
			</div>
			<div className='filter'>
				<div className='name-filter'>
						Contrast
				</div>
				<input type='range' max='200' min='0' value={props.data.contrast*100} onChange={e => props.setValue('contrast', e.target.value)} />
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
						Red
				</div>
				<input type='range' max='256' min='0' value={props.data.red} onChange={e => props.setValue('red', e.target.value)} />
				<span className='value-filter'>{props.data.red} </span>
			</div>
			<div className='filter'>
				<div className='name-filter'>
						Green
				</div>
				<input type='range' max='256' min='0' value={props.data.green} onChange={e => props.setValue('green', e.target.value)} />
				<span className='value-filter'>{props.data.green} </span>
			</div>
			<div className='filter'>
				<div className='name-filter'>
						Blue
				</div>
				<input type='range' max='256' min='0' value={props.data.blue} onChange={e => props.setValue('blue', e.target.value)} />
				<span className='value-filter'>{props.data.blue} </span>
			</div>
			<div className='filter'>
				<div className='name-filter'>
						Alpha
				</div>
				<input type='range' max='100' min='0' value={props.data.alpha*100} onChange={e => props.setValue('alpha', e.target.value)} />
				<span className='value-filter'>{props.data.alpha} </span>
			</div>
			<div className='filter' style={{ borderBottom: 'none' }}>
				<div className='name-filter'>
						Grayscale
				</div>
				<label className="switch" id='grayscale'>
					<input type="checkbox" checked={props.data.grayscale} onChange={e => props.setValue('grayscale')}/>
					<span className="slider round"></span>
				</label>
			</div>
		</div>
	);
}


export default Filter;