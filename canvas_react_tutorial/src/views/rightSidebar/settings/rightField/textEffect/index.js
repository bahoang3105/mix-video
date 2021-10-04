import Animation from "./Animation";
import DropShadow from "./DropShadow";

const TextEffect = (props) => {
  return (
    <div className='right-field'>
      <div className='right-field-name'>
        Text Effect
      </div>
      <Animation data={props.data} setValue={props.setValue} />
      <DropShadow data={props.data} setValue={props.setValue} />
    </div>
  );
}

export default TextEffect;