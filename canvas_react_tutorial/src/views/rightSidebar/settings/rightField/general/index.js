// import FullScreen from "./FullScreen";
// import FullScreenExit from "./FullSreenExit";
import InputField from "./InputField";
import Transparency from "./Transparency";

const General = (props) => {
  const setValue = (type, value) => {
    if(!props.data.lock) {
      props.setValue(type, value);
    }
  }
  return(
    <>
      <div className='right-field'>
        <div className='row-field'>
          <InputField nameField='X' value={props.data.x} setValue={setValue} lock={props.data.lock} />
          <InputField nameField='Y' value={props.data.y} setValue={setValue} lock={props.data.lock} />
          <InputField nameField='G' value={props.data.g} setValue={setValue} lock={props.data.lock} />
        </div>
        <div className='row-field'>
          <InputField nameField="W" value={props.data.width} setValue={setValue} lock={props.data.lock} />
          <InputField nameField='H' value={props.data.height} setValue={setValue} lock={props.data.lock} />
          <div className='full-screen'>
            {/* <FullScreenExit />
            <FullScreen /> */}
          </div>
        </div>
      </div>
      <Transparency value={props.data.opacity * 100} setValue={setValue} lock={props.data.lock} />
    </>
  );
};

export default General;