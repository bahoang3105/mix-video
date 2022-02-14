import '../../css/content.css';
import Main from './Main';


const Content = ({ name, size, publish }) => {
  if (size.width !== 0) {
    return (
      <>
        <Main size={size} publish={publish} name={name} />
      </>
    );
  }
  return (
    <div></div>
  );
};

export default Content;
