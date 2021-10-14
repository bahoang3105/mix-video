const FileUploaded = (props) => {
  const name = props.name.length >= 16 ? props.name.substring(0, 16) + '...' : props.name;
  return (
    <div 
      className='file-uploaded' 
      style={{ backgroundImage: `url(${props.img})`, backgroundSize: 'cover' }}
    >
      <span className='name-file-upload'>
        {name}
      </span>
    </div>
  );
}

export default FileUploaded;