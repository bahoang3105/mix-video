const Scene = (props) => {
  return(
    <div>
      <span className='scene-name'>
        {props.name}
      </span>
      <p className='scene-tick'></p>
    </div>
  );
};

export default Scene;
