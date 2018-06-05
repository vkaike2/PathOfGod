const { ipcRenderer, shell} = require('electron');


window.onload = function(){
    ipcRenderer.send('requisicao-teste');
   
};

ipcRenderer.on('resposta-teste',(envent, arg) => {
    console.log(arg);
});
