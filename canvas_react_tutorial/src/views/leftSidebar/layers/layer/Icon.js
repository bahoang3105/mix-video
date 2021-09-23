import { AiFillYoutube } from "react-icons/ai";

const Icon = (props) => {
  const icon = (type) => {
    switch(type) {
      case 'video':
        return <AiFillYoutube />;
      default:
        return;
    };
  }
  return(
    <div className='icon-layer'>
      {icon(props.type)}
    </div>
  );
};

export default Icon;