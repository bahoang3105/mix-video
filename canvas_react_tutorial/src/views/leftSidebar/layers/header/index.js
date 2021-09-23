import ButtonAdd from "./ButtonAdd";
import ButtonLock from "./ButtonLock";
import NameOfLayer from "./NameOfLayer";

const Header = () => {
  return(
    <div className='left-header'>
      <NameOfLayer name='LAYERS OF SCENE 1'/>
      <ButtonLock />
      <ButtonAdd />
    </div>
  );
};

export default Header;