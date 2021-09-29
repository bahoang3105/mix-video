import Circle from './Circle';
import Shape from './Shape';
import Rectangle from './Rectangle';
import Triangle from './Triangle';
import { useState } from 'react';

const ShapeButton = (props) => {
  const [displayShape, setDisplayShape] = useState(' none');
  return (
    <div
      onMouseOver={() => setDisplayShape('')}
      onMouseOut={() => setDisplayShape(' none')}
    >
      <Shape name='Shape' />
      <span className='space-1 absolute' />
      <div className={`show-button-1${displayShape}`}>
        <div onClick={() => props.addLayer('rectangle')}>
          <Rectangle name='Rectangle' />
        </div>
        <div onClick={() => props.addLayer('circle')}>
          <Circle name='Circle' />
        </div>
        <div onClick={() => props.addLayer('triangle')}>
          <Triangle name='Triangle' />
        </div>
      </div>
    </div>
  );
}

export default ShapeButton;