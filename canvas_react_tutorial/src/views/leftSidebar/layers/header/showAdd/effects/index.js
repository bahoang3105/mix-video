import { useState } from 'react';
import Countdown from './Countdown';
import Effects from './Effects';
import LuckyDial from './LuckyDial';
import Prize from './Prize';
import VirtualGift from './VirtualGift';

const EffectButtons = () => {
  const [displayEffects, setDisplayEffects] = useState(' none');
  return (
    <div 
      onMouseOver={() => setDisplayEffects('')}
      onMouseOut={() => setDisplayEffects(' none')}
    >
      <Effects name='Effects' />
      <span className='space absolute' />
      <div className={`show-button-1${displayEffects}`}>
        <VirtualGift name='Virtual Gift' />
        <Countdown name='Countdown Timer' />
        <LuckyDial name='Lucky Dial' />
        <Prize name='Prize announcement' />
      </div>
    </div>
  );
}

export default EffectButtons;