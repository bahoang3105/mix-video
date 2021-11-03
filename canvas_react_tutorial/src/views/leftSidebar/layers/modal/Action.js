import axios from "axios";
import BaseUrl from "../../../../BaseUrl";

export const deleteFileAction = async (fileKey, data) => {
  try {
    await axios.delete(BaseUrl + '/file/deleteFile', {
      headers: {
        'secret-key': localStorage.getItem('secretKey'),
      },
      data: {
        fileKey: fileKey,
      }
    });
    const place = data.findIndex(file => file.fileKey === fileKey);
    const newData = [
      ...data.slice(0, place),
      ...data.slice(place+1),
    ];
    return newData;
  } catch (err) {
    console.log(err.response.data.message)
  }
}

export const renameFileAction = async (fileKey, fileName, data) => {
  try {
    await axios.put(BaseUrl + '/file/renameFile', {
      fileKey,
      fileName,
    }, {
      headers: {
        'secret-key': localStorage.getItem('secretKey'),
      }
    });
    const place = data.findIndex(file => file.fileKey === fileKey);
    const newData = [
      ...data.slice(0, place),
      {
        ...data[place],
        fileName,
      },
      ...data.slice(place+1),
    ];
    return newData;
  } catch (err) {
    console.log(err.response.data.message);
  }
}