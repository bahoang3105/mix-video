import '../../css/content.css';
import Main from './Main';


const Content = ({ size, publish }) => {
  if(size.width !== 0) {
    return(
      <>
        <Main size={size} publish={publish} />
      </>
      // <div/>
    );
  }
  return (
    <div></div>
  );
};

export default Content;
