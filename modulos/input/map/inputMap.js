const { app, 
    BrowserWindow, 
    ipcMain, 
    globalShortcut, 
    clipboard, 
    shell} = require('electron');

// var mapHelper = false;

module.exports = {
    esperaLeitura(numTeclado,data){
        app.on('ready', () => {
            if(this.mapHelper){
                globalShortcut.register('F', () => {
                        // if(numTeclado == 0){
                        //     shell.openItem('teclado.ahk');
                        //     numTeclado++
                        // }else if(numTeclado == 1){
                        //     shell.openItem('teclado1.ahk');
                        //     numTeclado++;
                        // }else{
                        //     shell.openItem('teclado2.ahk');
                        //     numTeclado = 0;
                        // }
                    setTimeout(() => {
                        // console.log(clipboard.readText('selection'));
                        // data.salvaDados(clipboard.readText('selection'));
                        data.salvaDados("Rarity: Rare"+"\r\n"
                                        +"Twisted Haven"+"\r\n"
                                        +"Alleyways Map"+"\r\n"
                                        +"--------"+"\r\n"
                                        +"Map Tier: 2"+"\r\n"
                                        +"Item Quantity: +63% (augmented)"+"\r\n"
                                        +"Item Rarity: +32% (augmented)"+"\r\n"
                                        +"Monster Pack Size: +21% (augmented)"+"\r\n"
                                        +"Quality: +8% (augmented)"+"\r\n"
                                        +"--------"+"\r\n"
                                        +"Item Level: 70"+"\r\n"
                                        +"--------"+"\r\n"
                                        +"Monsters reflect 13% of Elemental Damage"+"\r\n"
                                        +"+20% Monster Physical Damage Reduction"+"\r\n"
                                        +"Unique Boss deals 15% increased Damage"+"\r\n"
                                        +"Unique Boss has 20% increased Attack and Cast Speed"+"\r\n"
                                        +"Players have 20% less Recovery Rate of Life and Energy Shield"+"\r\n"
                                        +"--------"+"\r\n"
                                        +"Travel to this Map by using it in the Templar Laboratory or a personal Map Device. Maps can only be used once.")
                        let itemWindow = null;
                        itemWindow = new BrowserWindow({
                            width: 300,
                            height: 300,
                            alwaysOnTop : true
                            // transparent: true,
                            // frame: false
                        });
                        console.log(__dirname);
                        itemWindow.loadURL(`file://${__dirname}/../../../app/item.html`);
                
                        // setTimeout(() => {itemWindow.close();}, 1000);
                    }, 200);
                });
            }
        });
    },
    consultaView(){
        ipcMain.on('ativar-map', (event) =>{
            console.log(this.mapHelper);
            this.mapHelper = true;
        });
        ipcMain.on('desativar-map', (event) =>{
            console.log(this.mapHelper);
            this.mapHelper = false;
        });
    },mapHelper:false
}