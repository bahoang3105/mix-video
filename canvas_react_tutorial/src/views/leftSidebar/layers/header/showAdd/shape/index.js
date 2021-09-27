import Circle from './Circle';
import Shape from './Shape';
import Rectangle from './Rectangle';
import Triangle from './Triangle';
import { useState } from 'react';

const ShapeButton = () => {
  const [displayShape, setDisplayShape] = useState(' none');
  return (
    <div
      onMouseOver={() => setDisplayShape('')}
      onMouseOut={() => setDisplayShape(' none')}
    >
      <Shape name='Shape' />
      <span className='space-1 absolute' />
      <div className={`show-button-1${displayShape}`}>
        <Rectangle name='Rectangle' />
        <Circle name='Circle' />
        <Triangle name='Triangle' />
      </div>
    </div>
  );
}

export default ShapeButton;