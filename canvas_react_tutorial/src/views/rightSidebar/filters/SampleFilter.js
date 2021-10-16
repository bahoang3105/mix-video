import Picture from './sampleFilter.jpg';

const SampleFilter = (props) => {
	return (
		<div className='template'>
			<div className='template-name'>
				{props.name}
			</div>
			<div>
				<img src={Picture} alt='sample-filter' className='sample-filter' />
			</div>
		</div>
	);
}

export default SampleFilter;