import { useState } from "react";
import { Modal } from "react-bootstrap";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { FcFilmReel, FcMusic, FcRemoveImage } from "react-icons/fc";
import FileUploaded from "./FileUploaded";
import axios from 'axios';
import { getCurScene } from '../../../../redux/selectors';
import { connect } from 'react-redux';
import BaseUrl from "../../../../BaseUrl";
import PageNum from "./PageNum";

const Upload = ({ curScene, ...props }) => {
  const [uploadState, setUploadState] = useState(false);
  const [page, setPage] = useState(1);
  const closeModal = () => {
    props.setShow(false);
  }

  const upload = async (e) => {
    setUploadState(true);
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      const uploadFile = await axios.post(BaseUrl + '/file/upload', formData, {
        headers: {
          'secret-key': localStorage.getItem('secretKey'),
        }
      });
      props.setData([
        uploadFile.data.newFile,
        ...props.data
      ]);
      setUploadState(false);
      window.parent.postMessage({
        call: 'uploadFile',
        value: {
          fileDeital: uploadFile.data.newFile
        }
      }, '*');
    }
    catch(err) {
      console.error(err.response.data.message);
    }
  }

  const renew = async(place) => {
    try {
      const { data } = await axios.get(BaseUrl + '/file/renewUrl', {
        headers: {
          'secret-key': localStorage.getItem('secretKey'),
        },
        params: {
          fileKey: props.data[place].fileKey,
        }
      });
      props.setData([
        ...props.data.slice(0, place),
        {
          ...props.data[place],
          url: data.url,
          date: new Date(),
        },
        ...props.data.slice(place+1),
      ]);
    }
    catch(err) {
      console.error(err);
    }
  }

  const renderList = () => {
    if(props.data.length === 0 && !uploadState) {
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
    for(let i = page*4-4; i < (props.data.length > page*4 ? page*4 : props.data.length); i++) {
      listUpload.push(
        <FileUploaded 
          key={props.data[i].fileKey}
          img={props.data[i].img}
          url={props.data[i].url}
          name={props.data[i].fileName} 
          date={props.data[i].date}
          fileKey={props.data[i].fileKey}
          fileName={props.data[i].fileName}
          place={i}
          renew={renew}
          type={props.type}
          curScene={curScene}
          closeModal={closeModal}
          deleteFile={props.deleteFile}
          renameFile={props.renameFile}
        />
      );
    }
    return (
      <div className='list-upload'>
        {listUpload}
      </div>
    );
  }

  const renderPage = () => {
    if(props.data.length === 0) {
      return;
    }
    const numPage = Math.ceil(props.data.length/4);
    const listNumPage = [];
    listNumPage.push(
      <PageNum
        key='<'
        value='<'
        onSelected={page}
        setPage={setPage}
        numPage={numPage}
        disabled={page === 1}
      />
    );
    const start = (numPage > 5) ? (page > 2 ? (page > numPage - 2 ? numPage - 4 : page - 2) : 1) : 1;
    const end =  (numPage > 5) ? (page < 3 ? 5 : (page < numPage - 2 ? page + 2 : numPage)) : numPage;
    for(let i = start; i <= end; i++) {
      listNumPage.push(
        <PageNum 
          key={i}
          value={i}
          onSelected={page}
          setPage={setPage}
          numPage={numPage}
        />
      );
    }
    listNumPage.push(
      <PageNum
        key='>'
        value='>'
        onSelected={page}
        setPage={setPage}
        numPage={numPage}
        disabled={page === numPage}
      />
    );
    return listNumPage;
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
            disabled={uploadState} 
            accept={(props.type === 'video') ? 'video/*' : ((props.type === 'audio') ? 'audio/*' : 'image/*')}
          />
        </Modal.Body>
        <Modal.Footer>
          {renderList()}
          <div className='list-num-page'>
            {renderPage()}
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

const mapStateToProps = state => ({
  curScene: getCurScene(state),
});

export default connect(mapStateToProps)(Upload);