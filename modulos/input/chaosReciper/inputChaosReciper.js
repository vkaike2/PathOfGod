const { ipcMain, BrowserWindow, globalShortcut } = require('electron');
// const size = require('window-size');
const data = require('../../json/data');

module.exports = {
    chaosReciper: false,
    chaosWindow: null,
    inicia() {
        let { screen } = require('electron');
        let altura = 370;
        let largura = 175;
        let mainScreen = screen.getPrimaryDisplay();
        let caminhoView = `file://${__dirname}/../../../app/`;
        this.chaosWindow = new BrowserWindow({
            width: largura,
            height: altura,
            alwaysOnTop: true,
            frame: false,
            x: 1,
            y: ((mainScreen.bounds.height - altura) / 2)
        });
        // C:\Users\VICTOR\Desktop\GIT\PathOfGod\app\chaosReciper.html
        this.chaosWindow.loadURL(caminhoView + `chaosReciper.html`);
        // this.mainWindow.loadURL(caminhoView + `index.html`);
    },
    consultaView(mainWindow) {
        this.toggleChaosReciper(mainWindow);
        ipcMain.on('ativar-chaos-reciper', () => {
            this.chaosReciper = true;
            this.inicia();
        });
        ipcMain.on('desativar-chaos-reciper', () => {
            this.chaosReciper = false;
            this.chaosWindow.close();
        });
        ipcMain.on('lbl-Index-req', () => {
            mainWindow.send('lbl-Index-chaos', this.chaosReciper);
        });
        ipcMain.on('atualiza-chaosReciper',(evt,dados)=>{
            data.salvaChaosReciperConfig(dados);
            mainWindow.send('feedback-salvar');
        });
        ipcMain.on('salva-json-recipe',(evt,recipes)=>{
            data.salvaJsonRecipe(recipes);
        })
    },
     toggleChaosReciper(mainWindow) {
        globalShortcut.register('CmdOrCtrl+Alt+C', () => {
            mainWindow.send('toggle-chaos-reciper');
        });
    }
};