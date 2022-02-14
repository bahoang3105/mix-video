let isOpen = false;

const initPrompt = async () => {
  const secretKeySaved = localStorage.getItem('secretKey');
  const secretKey = secretKeySaved ? secretKeySaved : prompt('Please enter the secret key');
  let check = await fetch('http://localhost:3001/app/verifyKey', {
    method: 'GET',
    headers: {
      'secret-key': secretKey,
    },
  });
  if(check.status === 200) {
    renderButton();
    localStorage.setItem('secretKey', secretKey);
  } else {
    alert('Invalid key');
    localStorage.removeItem('secretKey');
  }
}

window.addEventListener('message', e => {
  switch(e.data.call) {
    case 'uploadFile': {
      console.log('===============upLoadFile===============');
      console.log(e.data.value);
      break;
    }
    case 'publish': {
      console.log('===============publish==================');
      console.log('Publish link: ' + e.data.value.rtmpLink);
      break;
    }
    case 'publishFailed': {
      console.log('===============publish==================');
      console.log(e.data.value.publish);
      break;
    }
    case 'unpublishing': {
      console.log('===============publish==================');
      console.log(e.data.value.publish);
      break;
    }
    case 'establish': {
      console.log('===============publish==================');
      console.log(e.data.value.publish);
      break;
    }
    default: {
      console.log('===============SomeEvents===============');
      console.log(e.data);
    }
  }
}, false);

const initIframe = () => {
  if(isOpen) return;
  const parentIframe = document.createElement('div');
  parentIframe.style = "width: 95vw; height: 90vh; margin: 0px auto; position: fixed; top: 36px; left: 0px; right: 0px; z-index: 100000; display: block;"
  const iframe = document.createElement('iframe');
  iframe.onload = () => {
    iframe.contentWindow.postMessage({ 
      call: 'connect', 
      value: {
        secretKey: localStorage.getItem('secretKey')
      }
    }, '*');
  }
  iframe.allow = 'camera *; microphone *; full-screen *; display-capture *';
  iframe.src = 'http://localhost:3000';
  parentIframe.appendChild(bar(parentIframe));
  parentIframe.appendChild(iframe);
  document.body.appendChild(parentIframe);
  iframe.width = '100%';
  iframe.height = '100%';
  isOpen = true;
  return;
}


const renderButton = () => {
  const button = document.createElement('div');
  button.innerHTML = 'Open';
  button.style = "padding: 5px; position: fixed; top: 15px; left: 100px; border: 1px solid rgb(221, 221, 221);"; 
  button.addEventListener('click', initIframe);
  document.body.appendChild(button);
}

const logoMinimize = (parentIframe) => {
  const logoSpace = document.createElement('div');
  const logo = document.createElement('img');
  logo.alt = 'minimize-logo';
  logo.src = 'https://static.appvn.com/a/uploads/thumbnails/042016/mix-by-camera360_icon.png';
  logo.style = 'width: 30px; height: 30px;';
  logoSpace.appendChild(logo);
  logoSpace.style = 'padding: 5px 1px; backgrong-color: white; position: fixed; top: calc(50% - 50px); cursor: pointer;';
  logoSpace.addEventListener('click', () => {
    parentIframe.style.visibility = 'visible';
    logoSpace.style.visibility = 'hidden';
  });
  return logoSpace;
}

const bar = (parentIframe) => {
  const barDiv = document.createElement('div');
  const close = document.createElement('div');
  const minimize = document.createElement('div');
  close.innerHTML = 'X';
  minimize.innerHTML = '-';
  close.style = 'padding: 2px 5px; background-color: #959ca5; color: white; font-size: 15px; border: 1px solid #cacaca; cursor: pointer; position: absolute; right: -3px; margin-top: -25px';
  minimize.style = 'padding: 1px 8px 3px 8px; background-color: #959ca5; color: white; font-size: 15px; border: 1px solid #cacaca; cursor: pointer; position: absolute; right: 20px; margin-top: -25px';
  close.addEventListener('click', () => closeIframe(parentIframe));
  minimize.addEventListener('click', () => minimizeIframe(parentIframe));
  barDiv.appendChild(minimize);
  barDiv.appendChild(close);
  barDiv.style = 'display: flex';
  return barDiv;
}

const closeIframe = (parentIframe) => {
  parentIframe.parentNode.removeChild(parentIframe);
  isOpen = false;
}

const minimizeIframe = (parentIframe) => {
  parentIframe.style.visibility = 'hidden';
  document.body.appendChild(logoMinimize(parentIframe));
}

initPrompt();
