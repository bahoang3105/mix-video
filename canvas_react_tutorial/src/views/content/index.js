import '../../css/content.css';
import Logo from './logo/Logo';
import Main from './Main';


const Content = ({ size }) => {
  if(size.width !== 0) {
    return(
      <>
        <Logo size={size} />
        <Main size={size} />
      </>
    );
  }
  return (
    <div></div>
  );
};

export default Content;
