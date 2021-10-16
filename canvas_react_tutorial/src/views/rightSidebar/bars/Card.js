const Card = (props) => {
  return (
    <label
      className='card'
      style={{backgroundColor: props.color}}
      onClick={props.onClick}
      id={props.id}
    >
      {props.name}
    </label>
  );
};

export default Card;