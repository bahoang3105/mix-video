// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer, desktopCapturer } = require('electron');
const { readFileSync } = require('fs');
const { join } = require('path');

// Set up context bridge between the renderer process and the main process
contextBridge.exposeInMainWorld(
  'shell',
  {
    open: () => ipcRenderer.send('shell:open'),
  }
);

window.addEventListener('DOMContentLoaded', () => {
  const rendererScript = document.createElement('script');
  rendererScript.text = readFileSync(join(__dirname, 'renderer.js'), 'utf8');
  document.body.appendChild(rendererScript);

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }

  ipcRenderer.on('cpu', (event, data) => {
    if (data > 80) {
      ipcRenderer.send('notifyCPU');
    }
  });
});
