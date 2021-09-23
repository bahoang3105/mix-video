const Scene = (props) => {
  return(
    <div className='scene-card'>
      <span className='scene-name'>
        {props.name}
      </span>
      <p className='scene-tick'></p>
    </div>
  );
};

export default Scene;
