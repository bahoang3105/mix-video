import { useState } from 'react';
import Chain from './Chain';
import Comment from './Comment';
import Count from './Count';
import Filter from './Filter';
import FilterUser from './FilterUser';
import Pin from './Pin';

const CommentButton = () => {
  const [displayComment, setDisplayComment] = useState(' none');
  return (
    <div
      onMouseOver={() => setDisplayComment('')}
      onMouseOut={() => setDisplayComment(' none')}
    >
      <Comment name='Comment' />
      <span className='space-1 absolute' />
      <div className={`show-button-1${displayComment}`}>
        <Pin name='Pin comment' />
        <Chain name='Comment chain' />
        <Count name='Count comments' />
        <Filter name='Filter comments' />
        <FilterUser name='Filter users' />
      </div>
    </div>
  );
}

export default CommentButton;