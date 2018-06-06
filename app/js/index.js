const { ipcRenderer, shell} = require('electron');


window.onload = function(){
    ipcRenderer.send('requisicao-teste');
   
};

ipcRenderer.on('item-copiado',(envent) => {
    ipcRenderer.send('mostrar-item');
});
