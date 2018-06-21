const { app, BrowserWindow, ipcMain } = require('electron');
const inputMap = require('../map/inputMap');

module.exports = {
    mainWindow: null,
    iniciaMainWindow() {
        let caminhoView = `file://${__dirname}/../../../app/`;
        app.on('ready', () => {
            console.log("Aplicacao iniciada");
            this.mainWindow = new BrowserWindow({
                width: 600,
                height: 800
                // frame: false
            });
            // mainWindow.setMenu(null);
            this.mainWindow.loadURL(caminhoView + `index.html`);
            this.buscaRequisicao();
        });
    },
    buscaRequisicao() {
        inputMap.consultaView(this.mainWindow);
    }
}