const { ipcMain,BrowserWindow } = require('electron');
// const size = require('window-size');

module.exports = {
    chaosReciper: false,
    chaosWindow: null,
    inicia() {
        let { screen } = require('electron');
        let altura = 150;
        let largura = 600;
        let mainScreen = screen.getPrimaryDisplay();
        let caminhoView = `file://${__dirname}/../../../app/`;
        this.chaosWindow = new BrowserWindow({
            width: largura,
            height: altura,
            alwaysOnTop: true,
            // frame: false,
            x:((mainScreen.bounds.width - largura)/2),
            y: 0,
            frame: false
        });
        // C:\Users\VICTOR\Desktop\GIT\PathOfGod\app\chaosReciper.html
        this.chaosWindow.loadURL(caminhoView+`chaosReciper.html`);
        // this.mainWindow.loadURL(caminhoView + `index.html`);
    },
    consultaView(mainWindow) {
        ipcMain.on('ativar-chaos-reciper', () => {
            this.chaosReciper = true;
            
            // console.log(screen);
            this.inicia();
        });

        ipcMain.on('desativar-chaos-reciper', () => {
            this.chaosReciper = false;
            this.chaosWindow.close();
        });
        ipcMain.on('lbl-Index-req', () => {
            mainWindow.send('lbl-Index-chaos', this.chaosReciper);
        });

    }
};