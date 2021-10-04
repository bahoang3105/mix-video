const Scene = (props) => {
  return(
    <div className='scene-card'>
      <div className='scene-name'>
        {props.name}
        <p className='scene-tick'></p>
      </div>
    </div>
  );
};

export default Scene;
