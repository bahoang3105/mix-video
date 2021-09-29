import { useState } from "react";
import FullScreen from "./FullScreen";
import FullScreenExit from "./FullSreenExit";
import InputField from "./InputField";
import Transparency from "./Transparency";

const Genaral = () => {
  const [trans, setTrans] = useState('50');
  return(
    <>
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
      <Transparency value={trans} setTrans={setTrans}/>
    </>
  );
};

export default Genaral;