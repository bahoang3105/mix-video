const PageNum = (props) => {
  const changePage = () => {
    if(props.value === '<') {
      if(props.onSelected > 1) {
        props.setPage(props.onSelected - 1);
      }
    } else if(props.value === '>') {
      if(props.onSelected < props.numPage)
      props.setPage(props.onSelected + 1);
    } else {
      props.setPage(props.value);
    }
  }
  return (
    <div
      className={`page-num${props.onSelected === props.value ? ' selected-page' : ''}${props.disabled ? ' block-page' : ''}`}
      onClick={changePage}
    >
      {props.value}
    </div>
  );
}

export default PageNum;