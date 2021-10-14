import { useState } from "react";
import { Modal } from "react-bootstrap";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { FcFilmReel, FcMusic, FcRemoveImage } from "react-icons/fc";
import FileUploaded from "./FileUploaded";
import axios from 'axios';

const Upload = (props) => {
  const [uploadState, setUploadState] = useState(false);

  const closeModal = () => {
    props.setShow(false);
  }

  const upload = async (e) => {
    setUploadState(true);
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      const uploadFile = await axios.post('http://localhost:8080/file/upload', formData);
      const url = await axios.get('http://localhost:8080/file/download', {
        params: {
          fileKey: uploadFile.data.newFile.fileKey,
        }
      });
      props.setData([
        {
          ...uploadFile.data.newFile,
          ...url.data,
        },
        ...props.data
      ]);
      setUploadState(false);
    }
    catch(err) {
      console.error(err);
    }
  }

  // const uploading = () => {

  // }

  const renderList = () => {
    if(props.data.length === 0 && !uploadState) {
      switch (props.type) {
        case 'Image': {
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
        case 'Video': {
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
        case 'Audio': {
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
          key={props.data[i].fileKey} 
          img={props.data[i].url}
          name={props.data[i].fileName} 
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
              {uploadState ? `We are uploading this ${props.type}. It will take a few minutes, in the meantime you can do other things` : `Please choose ${props.choose} here.`}
            </div>
            <div className='notice-upload'>
              File should be {props.typeNotice}.
            </div>
          </label>
          <input id="file-upload" type="file" onChange={e => upload(e)} />
        </Modal.Body>
        <Modal.Footer>
          {renderList()}
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default Upload;