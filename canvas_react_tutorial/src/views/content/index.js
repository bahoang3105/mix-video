import '../../css/content.css';
import Main from './Main';


const Content = ({ size }) => {
  if(size.width !== 0) {
    return(
      <>
        <Main size={size} />
      </>
    );
  }
  return (
    <div></div>
  );
};

export default Content;
