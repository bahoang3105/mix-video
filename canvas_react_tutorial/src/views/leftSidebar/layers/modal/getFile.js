import axios from "axios";
import BaseUrl from "../../../../BaseUrl";

const GetFile = async () => {
  const files = await axios.get(BaseUrl + '/file/getFiles', {
    headers: {
      'secret-key': localStorage.getItem('secretKey'),
    }
  });
  return files;
}

export default GetFile;