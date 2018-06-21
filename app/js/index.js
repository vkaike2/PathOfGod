let lblReciper = "Off";
function indexVariaveis() {
    let lblMap = $('[id="map-label"]');
    let lblRec = $('[id="recipe-label"]');
    ipcRenderer.send('lbl-Index-req');
    ipcRenderer.on('lbl-Index-Res', (event, mapa) => {
        if (mapa) {
            lblMap.text('On');
        } else {
            lblMap.text('Off');
        }
        lblRec.text('Off');
    })
}

window.onload = function () {
    ipcRenderer.send('requisicao-teste');
};

ipcRenderer.on('item-copiado', (envent) => {
    ipcRenderer.send('mostrar-item');
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
