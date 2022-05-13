import '../../css/content.css';
import Main from './Main';


const Content = ({ name, size, publish, publishDone }) => {
  if (size.width !== 0) {
    return (
      <>
        <Main size={size} publish={publish} publishDone={publishDone} name={name} />
      </>
    );
  }
  return (
    <div></div>
  );
};

export default Content;
