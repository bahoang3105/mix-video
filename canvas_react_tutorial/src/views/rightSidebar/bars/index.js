import { useState } from "react";
import Card from "./Card";
import Dropdown from "./Dropdown";

const Bars = (props) => {
  const [isSelectFilters, setIsSelectFilters] = useState(true);
  const colorFilters = isSelectFilters ? 'white' : '';
  const colorSettings = isSelectFilters ? '' : 'white';
  const onClickFilters = () => {
    setIsSelectFilters(true);
    props.isSelectFilters(true);
  }
  const onClickSettings = () => {
    setIsSelectFilters(false);
    props.isSelectFilters(false);
  }
  return (
    <div className='bars' id='right-bar'>
      <div className='dropdown-display' onClick={() => props.setDisplay(!props.display)}>  
        <Dropdown display={props.display} />
      </div>
      <div className='cards'>
        <Card name='Settings' color={colorSettings} onClick={onClickSettings} />
        <Card name='Filters' id='filters-card' color={colorFilters} onClick={onClickFilters} />
      </div>
    </div>
  );
};

export default Bars;
