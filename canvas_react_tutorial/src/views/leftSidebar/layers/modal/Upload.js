import { useState } from "react";
import { Modal } from "react-bootstrap";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { FcFilmReel, FcMusic, FcRemoveImage } from "react-icons/fc";
import FileUploaded from "./FileUploaded";
import { getCurScene } from '../../../../redux/selectors';
import { connect } from 'react-redux';
import PageNum from "./PageNum";
import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQ0OTQxNCwibmFtZSI6InR1YW5yMmIiLCJlbWFpbCI6InR1YW5yMmJAdmNjb3JwLnZuIiwidXNlcm5hbWUiOiJ0dWFucjJiIiwicGhvbmUiOiIwODM0NTY3NzQxIiwic3RhdHVzIjoiYWN0aXZlIiwic1JvbGUiOiJhZG1pbmlzdHJhdG9yIiwiYWN0aXZhdGVkIjpmYWxzZSwiYXZhdGFyVXJsIjoiaHR0cHM6Ly9jZG4uc29oYXR2LnZuL1pxN1VzRkdxQ0pudjF5T0ovb3ZwLzEwMDAwMDYvMjAxOS8wNS8zMC8xNTU5MTg4NjMzNTUxLW1hbi5wbmciLCJpYXQiOjE2MzYxMDEzMjIsImV4cCI6MTYzODY5MzMyMn0.oYbgGzz3zizynsmzc5hPiJQgJi4qb0BAp0QwgEGhfxU';

const Upload = ({ curScene, ...props }) => {
  const [uploadState, setUploadState] = useState(false);
  const [page, setPage] = useState(1);
  const closeModal = () => {
    props.setShow(false);
  }

  const upload = async (e) => {
    try {
      if(props.type === 'image' || props.type === 'audio') {
        setUploadState(true);
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        try {
          // upload file
          const { data } = await axios.post('https://ovp.sohatv.vn/api/cms/upload/file', formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'X-OVP-APP': 'g63hfzwu6heogfzxrop2z3v3hgii88im',
            }
          });

          //file uploaded info 
          const fileName = data.data.originalname;
          const fileNameSplit = fileName.split('.');
          const fileType = fileNameSplit[fileNameSplit.length - 1];
          const fileKey = data.data.objectKey;
          const url = data.data.url;

          // save file uploaded info to database
          await axios.post(process.env.API_URL + '/file/upload', {
            fileName,
            fileType,
            fileKey,
            url,
            liveId: localStorage.getItem('liveId'),
          }, {
            headers: {
              'secret-key': localStorage.getItem('secretKey'),
            },
          });

          // update data state
          props.setData([
            {
              fileName,
              fileType,
              fileKey,
              url,
            },
            ...props.data
          ]);
          setUploadState(false);

          // callback message
          window.parent.postMessage({
            call: 'uploadFile',
            value: {
              fileDeital: data.data
            }
          }, '*');
        }
        catch(err) {
          console.error(err.response.data.message);
        }
      } else {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        const thumbnailAudio = 'https://media.wired.com/photos/5f9ca518227dbb78ec30dacf/master/w_2560%2Cc_limit/Gear-RIP-Google-Music-1194411695.jpg'
        const thumbnail = (props.type === 'audio') ? thumbnailAudio : url;
    
        const uploadFile = {
          fileName: file.name,
          type: props.type,
          img: thumbnail,
          url: url,
          fileKey: Math.random() + file.name,
        }
        props.setData([
          uploadFile,
          ...props.data,
        ]);
      }
    } catch (e) {
      console.error(e);
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
              Please choose {props.choose} here.
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