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
    >
      <Effects name='Effects' />
      <span className='space absolute' />
      <div className={`show-button-1${displayEffects}`}>
        <div onClick={() => props.addLayer('virtualGift')}>
          <VirtualGift name='Virtual Gift' />
        </div>
        <div onClick={() => props.addLayer('countdown')}>
          <Countdown name='Countdown Timer' />
        </div>
        <div onClick={() => props.addLayer('luckyDial')}>
          <LuckyDial name='Lucky Dial' />
        </div>
        <div onClick={() => props.addLayer('prize')}>
          <Prize name='Prize announcement' />
        </div>
      </div>
    </div>
  );
}

export default EffectButtons;