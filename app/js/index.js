// let lblReciper = "Off";
function indexVariaveis() {
    let lblMap = $('[id="map-label"]');
    let btnMap = $('[id="btnMap"]');
    let btnChaosReciper = $('[id="btnChaosReciper"]');
    let lblChaosReciper =  $('[id="recipe-label"]');
    ipcRenderer.send('lbl-Index-req');
    ipcRenderer.on('lbl-Index-Res', (event, mapa) => {
        if (mapa) {
            lblMap.text('On');
            btnMap.addClass('button-basic-active');
        } else {
            lblMap.text('Off');
        }
        lblRec.text('Off');
    });
    ipcRenderer.on('lbl-Index-chaos', (event, chaos) => {
        if (chaos) {
            lblChaosReciper.text('On');
            btnChaosReciper.addClass('button-basic-active');
        } else {
            lblChaosReciper.text('Off');
        }
        lblRec.text('Off');
    });

}

ipcRenderer.on('item-copiado', (evt) => {
    ipcRenderer.send('mostrar-item');
});
ipcRenderer.on('toggle-map-helper',(evt)=>{
    $('[id="btnMap"]').trigger("click");
});
ipcRenderer.on('toggle-chaos-reciper',(evt)=>{
    $('[id="btnChaosReciper"]').trigger("click");
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

    $('[id="btnChaosReciper"]').click(function(){
        let btnChaosReciper = $('[id="btnChaosReciper"]');
        let lblChaosReciper =  $('[id="recipe-label"]');

        if (!btnChaosReciper.hasClass('button-basic-active')) {
            ipcRenderer.send('ativar-chaos-reciper');
            lblChaosReciper.text('On');
        } else {
            ipcRenderer.send('desativar-chaos-reciper');
            lblChaosReciper.text('Off');
        }
        btnChaosReciper.toggleClass('button-basic-active');

    });

});
