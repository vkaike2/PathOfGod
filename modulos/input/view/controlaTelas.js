const { app, BrowserWindow, ipcMain } = require('electron');
const inputMap = require('../map/inputMap');
const inputChaosReciper = require('../chaosReciper/inputChaosReciper');

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
            this.mainWindow.setMenu(null);
            this.mainWindow.loadURL(caminhoView + `index.html`);
            this.buscaRequisicao();
        });
        app.on('window-all-closed',() => {
            app.quit();
        });
    },
    buscaRequisicao() {
        inputMap.atualizaTimeout();
        inputMap.consultaView(this.mainWindow);
        inputChaosReciper.consultaView(this.mainWindow);
        ipcMain.on('teste',()=>{
            console.log('teste');
        });

    }
}