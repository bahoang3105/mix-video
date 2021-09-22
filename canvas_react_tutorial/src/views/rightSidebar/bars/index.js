import Card from "./Card";
import Dropdown from "./Dropdown";

const Bars = () => {
  return (
    <div className='bars' id='right-bar'>
      <Dropdown />
      <div className='cards'>
        <Card name='Settings' />
        <Card name='Scenes' color='white'/>
      </div>
    </div>
  );
};

export default Bars;
