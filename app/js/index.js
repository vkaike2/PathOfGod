let lblReciper = "Off";
function indexVariaveis() {
    let lblMap = $('[id="map-label"]');
    let lblRec = $('[id="recipe-label"]');
    let btnMap = $('[id="btnMap"]');
    ipcRenderer.send('lbl-Index-req');
    ipcRenderer.on('lbl-Index-Res', (event, mapa) => {
        if (mapa) {
            lblMap.text('On');
            btnMap.addClass('button-basic-active');
        } else {
            lblMap.text('Off');
        }
        lblRec.text('Off');
    })
}

ipcRenderer.on('item-copiado', (evt) => {
    ipcRenderer.send('mostrar-item');
});
ipcRenderer.on('toggle-map-helper',(evt)=>{
    $('[id="btnMap"]').trigger("click");
});

$(document).ready(function () {
    indexVariaveis();

    $('[id="btnMap"]').click(function () {
        let btnMap = $('[id="btnMap"]');
        let lblMap = $('[id="map-label"]');

        if (!btnMap.hasClass('button-basic-active')) {
            ipcRenderer.send('ativar-map');
            lblMap.text('On');
        } else {
            ipcRenderer.send('desativar-map');
            lblMap.text('Off');
        }
        btnMap.toggleClass('button-basic-active');
    });
});
