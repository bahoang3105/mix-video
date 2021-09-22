import FullScreen from "./FullScreen";
import FullScreenExit from "./FullSreenExit";
import InputField from "./InputField";

const Genaral = () => {
  return(
    <div className='field'>
      <div className='row-field'>
        <InputField nameField='X' />
        <InputField nameField='Y' />
        <InputField nameField='G' />
      </div>
      <div className='row-field'>
        <InputField nameField="W" />
        <InputField nameField='H' />
        <div className='full-screen'>
          <FullScreenExit />
          <FullScreen />
        </div>
      </div>
    </div>
  );
};

export default Genaral;