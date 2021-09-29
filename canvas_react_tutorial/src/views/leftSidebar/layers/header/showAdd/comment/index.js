import { useState } from 'react';
import Chain from './Chain';
import Comment from './Comment';
import Count from './Count';
import Filter from './Filter';
import FilterUser from './FilterUser';
import Pin from './Pin';

const CommentButton = (props) => {
  const [displayComment, setDisplayComment] = useState(' none');
  return (
    <div
      onMouseOver={() => setDisplayComment('')}
      onMouseOut={() => setDisplayComment(' none')}
    >
      <Comment name='Comment' />
      <span className='space-1 absolute' />
      <div className={`show-button-1${displayComment}`}>
        <div onClick={() => props.addLayer('pin')}>
          <Pin name='Pin comment' />
        </div>
        <div onClick={() => props.addLayer('chain')}>
          <Chain name='Comment chain' />
        </div>
        <div onClick={() => props.addLayer('count')}>
          <Count name='Count comments' />
        </div>
        <div onClick={() => props.addLayer('filter')}>
          <Filter name='Filter comments' />
        </div>
        <div onClick={() => props.addLayer('filterUser')}>
          <FilterUser name='Filter users' />
        </div>
      </div>
    </div>
  );
}

export default CommentButton;