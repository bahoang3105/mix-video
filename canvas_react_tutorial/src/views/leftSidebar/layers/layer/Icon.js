import { AiFillDribbbleCircle, AiFillGift, AiFillYoutube, AiOutlineCamera, AiOutlineOrderedList, AiOutlinePushpin, AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { BiGift, BiImageAlt, BiMicrophone, BiMoney, BiText, BiTime } from "react-icons/bi";
import { BsFillTriangleFill, BsMusicNoteList, BsSquareFill } from "react-icons/bs";
import { FcConferenceCall } from "react-icons/fc";
import { GoScreenFull } from "react-icons/go";
import { GrInternetExplorer, GrObjectUngroup } from "react-icons/gr";
import { ImFileVideo, ImFilter, ImSortNumericAsc } from "react-icons/im";

const Icon = (props) => {
  const icon = (type) => {
    switch(type) {
      case 'libraryAudio':
        return <BsMusicNoteList />;
      case 'micro':
        return <BiMicrophone />;
      case 'chain':
        return <AiOutlineOrderedList />;
      case 'count':
        return <ImSortNumericAsc />;
      case 'filter':
        return <ImFilter />;
      case 'filterUser':
        return <AiOutlineUser />;
      case 'pin':
        return <AiOutlinePushpin />;
      case 'conference':
        return <FcConferenceCall />;
      case 'countdown':
        return <BiTime />;
      case 'luckyDial':
        return <AiFillGift />;
      case 'prize':
        return <BiMoney />;
      case 'virtualGift':
        return <BiGift />;
      case 'group':
        return <GrObjectUngroup />;
      case 'image':
        return <BiImageAlt />;
      case 'circle':
        return <AiFillDribbbleCircle />;
      case 'rectangle':
        return <BsSquareFill />;
      case 'triangle':
        return <BsFillTriangleFill />;
      case 'text':
        return <BiText />;
      case 'camera':
        return <AiOutlineCamera />;
      case 'invite':
        return <AiOutlineUserAdd />;
      case 'libraryVideo':
        return <ImFileVideo />;
      case 'screen':
        return <GoScreenFull />;
      case 'website':
        return <GrInternetExplorer />;
      case 'youtube':
        return <AiFillYoutube />;
      default:
        return;
    };
  }
  return(
    <div className='icon-layer'>
      {icon(props.type)}
    </div>
  );
};

export default Icon;