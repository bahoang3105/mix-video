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
      className='not-allowed'
    >
      <Comment name='Comment' />
      <span className='space-1 absolute' />
      <div className={`show-button-1${displayComment}`}>
        <div className='not-allowed'>
          <Pin name='Pin comment' />
        </div>
        <div className='not-allowed'>
          <Chain name='Comment chain' />
        </div>
        <div className='not-allowed'>
          <Count name='Count comments' />
        </div>
        <div className='not-allowed'>
          <Filter name='Filter comments' />
        </div>
        <div className='not-allowed'>
          <FilterUser name='Filter users' />
        </div>
      </div>
    </div>
  );
}

export default CommentButton;