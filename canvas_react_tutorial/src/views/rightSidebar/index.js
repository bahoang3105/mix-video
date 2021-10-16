import Bars from "./bars";
import '../../css/right.css';
import Settings from "./settings";
import Filters from "./filters";
import { useState } from "react";

const RightSidebar = () => {
  const [select, setSelect] = useState(true);
  const renderFilters = isFilters => {
    setSelect(isFilters);
  };
  const [display, setDisplay] = useState(true);
  if(select) {
    return(
      <div className='right'>
        <Bars isSelectFilters={renderFilters} setDisplay={setDisplay} display={display} />
        <Filters display={display} />
      </div>
    );
  }
  return(
    <div className='right'>
      <Bars isSelectFilters={renderFilters} setDisplay={setDisplay} display={display} />
      <Settings display={display} />
    </div>
  );
};

export default RightSidebar;
