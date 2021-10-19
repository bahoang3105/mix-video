// import { useState } from "react";
import { Modal } from "react-bootstrap";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { FcFilmReel, FcMusic, FcRemoveImage } from "react-icons/fc";
import FileUploaded from "./FileUploaded";
// import axios from 'axios';
import { getCurScene } from '../../../../redux/selectors';
import { connect } from 'react-redux';

const Upload = ({ curScene, ...props }) => {
  // const [uploadState, setUploadState] = useState(false);
  const closeModal = () => {
    props.setShow(false);
  }

  const upload = async (e) => {
    // setUploadState(true);
    // let formData = new FormData();
    // formData.append('file', e.target.files[0]);
    // try {
    //   const uploadFile = await axios.post('http://localhost:8080/file/upload', formData);
    //   const url = await axios.get('http://localhost:8080/file/download', {
    //     params: {
    //       fileKey: uploadFile.data.newFile.fileKey,
    //     }
    //   });
    //   const thumbnailVideo = 'https://colormedia.vn/public/upload/Blog/linh/9%20loi%20ich%20cua%20video/video-.jpg?1591950113988';
    //   const thumbnailAudio = 'https://media.wired.com/photos/5f9ca518227dbb78ec30dacf/master/w_2560%2Cc_limit/Gear-RIP-Google-Music-1194411695.jpg'
    //   const thumbnail = (props.type === 'image') ? url.data.url : ((props.type === 'video') ? thumbnailVideo : thumbnailAudio);

    //   props.setData([
    //     {
    //       ...uploadFile.data.newFile,
    //       img: thumbnail,
    //       url: url.data.url,
    //     },
    //     ...props.data
    //   ]);
    //   setUploadState(false);
    // }
    // catch(err) {
    //   console.error(err);
    // }
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    // const thumbnailVideo = 'https://colormedia.vn/public/upload/Blog/linh/9%20loi%20ich%20cua%20video/video-.jpg?1591950113988';
    const thumbnailAudio = 'https://media.wired.com/photos/5f9ca518227dbb78ec30dacf/master/w_2560%2Cc_limit/Gear-RIP-Google-Music-1194411695.jpg'
    const thumbnail = (props.type === 'audio') ? thumbnailAudio : url;

    const uploadFile = {
      fileName: file.name,
      type: props.type,
      img: thumbnail,
      url: url,
    }
    props.setData([
      uploadFile,
      ...props.data,
    ]);
  }

  // const renew = async(place) => {
  //   try {
  //     const url = await axios.get('http://localhost:8080/file/download', {
  //       params: {
  //         fileKey: props.data[place].fileKey,
  //       }
  //     });
  //     const thumbnail = (props.type === 'image') ? url.data.url : null;
  //     props.setData([
  //       ...props.data.slice(0, place),
  //       {
  //         ...props.data[place],
  //         url: url.data.url,
  //         img: thumbnail,
  //         date: new Date(),
  //       },
  //       ...props.data.slice(place+1),
  //     ]);
  //   }
  //   catch(err) {
  //     console.error(err);
  //   }
  // }

  const renderList = () => {
    // if(props.data.length === 0 && !uploadState) {
    if(props.data.length === 0) {
      switch (props.type) {
        case 'image': {
          return (
            <div className='empty-upload'>
              <div className='empty-upload-icon'>
                <FcRemoveImage />
              </div>
              <div className='notice-upload'>
                You don't have image yet
              </div>
            </div>
          );
        }  
        case 'video': {
          return (
            <div className='empty-upload'>
              <div className='empty-upload-icon'>
                <FcFilmReel />
              </div>
              <div className='notice-upload'>
                You don't have video yet
              </div>
            </div>
          );
        }  
        case 'audio': {
          return (
            <div className='empty-upload'>
              <div className='empty-upload-icon'>
                <FcMusic />
              </div>
              <div className='notice-upload'>
                You don't have audio yet
              </div>
            </div>
          );
        }      
        default:
          return <div/>
      }
    }
    const listUpload = [];
    for(let i = 0; i < props.data.length; i++) {
      listUpload.push(
        <FileUploaded 
          // key={props.data[i].fileKey} 
          key={props.data[i].url}
          img={props.data[i].img}
          url={props.data[i].url}
          name={props.data[i].fileName} 
          // date={props.data[i].date}
          // fileKey={props.data[i].fileKey}
          place={i}
          // renew={renew}
          type={props.type}
          curScene={curScene}
          closeModal={closeModal}
        />
      );
    }
    return (
      <div className='list-upload'>
        {listUpload}
      </div>
    );
  }

  return (
    <Modal
      show={props.show}
      onHide={closeModal}
      backdrop={true}
      className='modal modal-upload'
    >
      <div className='border-modal'>
        <Modal.Header>
          <span className='x-close close-upload' onClick={closeModal}>x</span>
          <Modal.Title>
            Upload {props.type}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="file-upload" className="custom-file-upload">
            <div className='file-upload-icon'>
              <BsFileEarmarkArrowUp />
            </div>
            <div className='info-add-image info-upload'>
              {/* {uploadState ? `We are uploading this ${props.type}. It will take a few minutes, in the meantime you can do other things` : `Please choose ${props.choose} here.`} */}
              Please choose ${props.choose} here.
            </div>
            <div className='notice-upload'>
              File should be {props.typeNotice}.
            </div>
          </label>
          <input 
            id="file-upload" 
            type="file" 
            onChange={e => upload(e)} 
            // disabled={uploadState} 
            accept={(props.type === 'video') ? 'video/*' : ((props.type === 'audio') ? 'audio/*' : 'image/*')}
          />
        </Modal.Body>
        <Modal.Footer>
          {renderList()}
        </Modal.Footer>
      </div>
    </Modal>
  );
}

const mapStateToProps = state => ({
  curScene: getCurScene(state),
});

export default connect(mapStateToProps)(Upload);