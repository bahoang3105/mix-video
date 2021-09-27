import { connect } from "react-redux";
import { getCurSceneName } from "../../../../redux/selectors";
import ButtonAdd from "./ButtonAdd";
import ButtonLock from "./ButtonLock";
import NameOfLayer from "./NameOfLayer";

const Header = ({ sceneName }) => {
  return(
    <div className='left-header'>
      <NameOfLayer name={sceneName}/>
      <ButtonLock />
      <ButtonAdd />
    </div>
  );
};

const mapStateToProps = state => ({
  sceneName: getCurSceneName(state),
});

export default connect(mapStateToProps)(Header);