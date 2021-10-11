import '../../css/content.css';
import Logo from './logo/Logo';
import Main from './Main';


const Content = ({ size }) => {
  return(
    <>
      <Logo />
      <Main size={size} />
    </>
  );
};

export default Content;
