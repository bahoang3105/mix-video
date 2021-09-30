import FullScreen from "./FullScreen";
import FullScreenExit from "./FullSreenExit";
import InputField from "./InputField";
import Transparency from "./Transparency";

const General = (props) => {
  return(
    <>
      <div className='field'>
        <div className='row-field'>
          <InputField nameField='X' value={props.data.x} setValue={props.setValue} />
          <InputField nameField='Y' value={props.data.y} setValue={props.setValue} />
          <InputField nameField='G' value={props.data.g} setValue={props.setValue} />
        </div>
        <div className='row-field'>
          <InputField nameField="W" value={props.data.width} setValue={props.setValue} />
          <InputField nameField='H' value={props.data.height} setValue={props.setValue} />
          <div className='full-screen'>
            <FullScreenExit />
            <FullScreen />
          </div>
        </div>
      </div>
      <Transparency value={props.data.opacity * 100} setValue={props.setValue}/>
    </>
  );
};

export default General;