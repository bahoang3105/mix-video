const Preview = () => {
  return (
    <div className='preview'>
    <div className='preview-div'>
      <label className='label-preview'>PREVIEW</label>
      <span>854x480</span>
      <div className='speed'>
        <lable className='label-speed'>Speed: </lable>
        <span>0 bps</span>
      </div>
      
    </div>
    <label className='label-info'>Preview is only available for livestream</label>
    </div>
  );
};

export default Preview;
