const renderButton = () => {
  const button = document.createElement('a');
  button.innerHTML = 'Open';
  button.style = "padding: 5px; position: fixed; top: 15px; left: 100px; border: 1px solid rgb(221, 221, 221); cursor: pointer";
  button.addEventListener('click', openApp);
  document.body.appendChild(button);
}

const openApp = () => {
  window.location.href = 'mix-video://liveId=101020';
}

renderButton();