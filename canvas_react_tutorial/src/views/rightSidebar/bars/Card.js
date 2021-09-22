const Card = (props) => {
  return (
    <label className='card' style={{backgroundColor: props.color}}>{props.name}</label>
  );
};

export default Card;