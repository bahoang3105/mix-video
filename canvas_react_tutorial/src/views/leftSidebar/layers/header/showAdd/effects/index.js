import { useState } from 'react';
import Countdown from './Countdown';
import Effects from './Effects';
import LuckyDial from './LuckyDial';
import Prize from './Prize';
import VirtualGift from './VirtualGift';

const EffectButtons = (props) => {
  const [displayEffects, setDisplayEffects] = useState(' none');
  return (
    <div 
      onMouseOver={() => setDisplayEffects('')}
      onMouseOut={() => setDisplayEffects(' none')}
      className='not-allowed'
    >
      <Effects name='Effects' />
      <span className='space absolute' />
      <div className={`show-button-1${displayEffects}`}>
        <div className='not-allowed'>
          <VirtualGift name='Virtual Gift' />
        </div>
        <div className='not-allowed'>
          <Countdown name='Countdown Timer' />
        </div>
        <div className='not-allowed'>
          <LuckyDial name='Lucky Dial' />
        </div>
        <div className='not-allowed'>
          <Prize name='Prize announcement' />
        </div>
      </div>
    </div>
  );
}

export default EffectButtons;