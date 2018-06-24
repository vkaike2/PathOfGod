const { app,
    BrowserWindow,
    ipcMain,
    globalShortcut,
    clipboard,
    shell } = require('electron');
const data = require('../../json/data');

module.exports = {
    mapHelper: false,
    numTeclado: 0,
    itemWinIsClosed: true,
    timeout: 1000,
    esperaLeitura() {
        globalShortcut.register('F', () => {
            if (this.numTeclado == 0) {
                shell.openItem('teclado.ahk');
                this.numTeclado++
            } else if (this.numTeclado == 1) {
                shell.openItem('teclado1.ahk');
                this.numTeclado++;
            } else {
                shell.openItem('teclado2.ahk');
                this.numTeclado = 0;
            }
            setTimeout(() => {
                data.salvaDados(clipboard.readText('selection'));
                // data.salvaDados("Rarity: Rare"+"\r\n"
                //                 +"Twisted Haven"+"\r\n"
                //                 +"Alleyways Map"+"\r\n"
                //                 +"--------"+"\r\n"
                //                 +"Map Tier: 2"+"\r\n"
                //                 +"Item Quantity: +65% (augmented)"+"\r\n"
                //                 +"Item Rarity: +32% (augmented)"+"\r\n"
                //                 +"Monster Pack Size: +21% (augmented)"+"\r\n"
                //                 +"Quality: +8% (augmented)"+"\r\n"
                //                 +"--------"+"\r\n"
                //                 +"Item Level: 70"+"\r\n"
                //                 +"--------"+"\r\n"
                //                 +"Monsters reflect 13% of Elemental Damage"+"\r\n"
                //                 +"+20% Monster Physical Damage Reduction"+"\r\n"
                //                 +"Unique Boss deals 15% increased Damage"+"\r\n"
                //                 +"Unique Boss has 20% increased Attack and Cast Speed"+"\r\n"
                //                 +"Players have 20% less Recovery Rate of Life and Energy Shield"+"\r\n"
                //                 +"--------"+"\r\n"
                //                 +"Travel to this Map by using it in the Templar Laboratory or a personal Map Device. Maps can only be used once.");
                let itemWindow = null;
                if (this.itemWinIsClosed) {
                    itemWindow = new BrowserWindow({
                        width: 300,
                        height: 300,
                        alwaysOnTop: true,
                        frame: false
                    });
                    itemWindow.loadURL(`file://${__dirname}/../../../app/item.html`);
                    this.itemWinIsClosed = false;
                    setTimeout(() => {
                        itemWindow.close();
                        setTimeout(() => {
                            this.itemWinIsClosed = true;
                        }, 200);
                    }, this.timeout);
                }
            }, 200);
        });
    },
    consultaView(mainWindow) {
        ipcMain.on('ativar-map', (event) => {
            this.mapHelper = true;
            this.esperaLeitura(timeout);
        });
        ipcMain.on('desativar-map', (event) => {
            this.mapHelper = false;
            globalShortcut.unregister('F');
        });
        ipcMain.on('lbl-Index-req', () => {
            mainWindow.send('lbl-Index-Res', this.mapHelper);
        });
        this.toggleMapHelper(mainWindow);

        ipcMain.on('atualiza-timeout',(event,timeout)=>{
            this.atualizaTimeout(timeout);
        });
    }, toggleMapHelper(mainWindow) {
        globalShortcut.register('CmdOrCtrl+Alt+F', () => {
            mainWindow.send('toggle-map-helper');
        });
    }, atualizaTimeout(timeout) {
        if(timeout && this.timeout != timeout){
            data.salvaTimeout(timeout*1000);
        }
        data.leTimeout()
            .then(dados => {
                if(dados.mapHelper >= 1000){
                    this.timeout = dados.mapHelper;
                }
            }).catch((erro) => {
                console.log(erro);//precisa tratar o erro
            });
    }
}