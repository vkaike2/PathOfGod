const { ipcRenderer, shell } = require('electron');


window.onload = function(){
    ipcRenderer.send('requisicao-teste');
};