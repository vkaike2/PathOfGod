const { ipcRenderer, shell} = require('electron');

window.onload = function(){
    ipcRenderer.send('requisicao-teste');
   
};

ipcRenderer.on('item-copiado',(envent) => {
    ipcRenderer.send('mostrar-item');
});

$(document).ready(function() {
    $('[id="btnMap"]').click(function(){
        let btnMap = $('[id="btnMap"]');
        let lblMap = $('[id="map-label"]');

        if(btnMap.hasClass('is-outlined')){
            btnMap.removeClass('is-outlined');
            btnMap.addClass('is-active')
            ipcRenderer.send('ativar-map');
            lblMap.text('On');
        }else if('is-active'){
            btnMap.removeClass('is-active');
            btnMap.addClass('is-outlined')
            ipcRenderer.send('desativar-map');
            lblMap.text('Off');
        }
    });
});
