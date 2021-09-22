const Card = (props) => {
  return (
    <lable className='card' style={{backgroundColor: props.color}}>{props.name}</lable>
  );
};

export default Card;