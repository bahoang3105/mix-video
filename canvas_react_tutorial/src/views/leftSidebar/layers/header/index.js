import { connect } from "react-redux";
import { getCurSceneName } from "../../../../redux/selectors";
import ButtonAdd from "./ButtonAdd";
import ButtonLock from "./ButtonLock";
import NameOfLayer from "./NameOfLayer";

const Header = ({ curScene, sceneName, lock, setLock }) => {
  return(
    <div className='left-header'>
      <NameOfLayer name={sceneName}/>
      <ButtonLock lock={lock} setLock={setLock} />
      <ButtonAdd curScene={curScene}/>
    </div>
  );
};

const mapStateToProps = state => ({
  sceneName: getCurSceneName(state),
});

export default connect(mapStateToProps)(Header);