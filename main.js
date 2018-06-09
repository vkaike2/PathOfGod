const { app, BrowserWindow, ipcMain, globalShortcut, clipboard, shell} = require('electron');
const data = require('./meus_modulos/data');
let numTeclado = 0;

app.on('ready', () => {
    console.log("Aplicacao iniciada");
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 800
    });
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});



app.on('ready', () => {
    let abrirItem = false;
    globalShortcut.register('F', () => {
        // setTimeout(() => {
        //     if(numTeclado == 0){
        //         shell.openItem('teclado.ahk');
        //         numTeclado++
        //     }else if(numTeclado == 1){
        //         shell.openItem('teclado1.ahk');
        //         numTeclado++;
        //     }else{
        //         shell.openItem('teclado2.ahk');
        //         numTeclado = 0;
        //     }
            
        // }, 100);
        // sleep(100);
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
            width: 200,
            height: 300,
            alwaysOnTop : true,
            // transparent: true,
            // frame: false
        });
        // itemWindow.setMenu(null);
        itemWindow.loadURL(`file://${__dirname}/app/item.html`);

        // setTimeout(() => {
        //     itemWindow.close();
        //     console.log('fechar');
        // }, 1000);
    })
});


 


// function sleep(milliseconds) {
//     var start = new Date().getTime();
//     for (var i = 0; i < 1e7; i++) {
//       if ((new Date().getTime() - start) > milliseconds){
//         break;
//       }
//     }
//   }