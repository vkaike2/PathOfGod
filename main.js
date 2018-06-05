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
    // CommandOrControl
    globalShortcut.register('F', () => {
        setTimeout(() => {
            if(numTeclado == 0){
                shell.openItem('teclado.ahk');
                numTeclado++
            }else if(numTeclado == 1){
                shell.openItem('teclado1.ahk');
                numTeclado++;
            }else{
                shell.openItem('teclado2.ahk');
                numTeclado = 0;
            }
            
        }, 100);
        // sleep(100);
        // console.log(clipboard.readText('selection'));
        data.salvaDados(clipboard.readText('selection'));
    })
});


ipcMain.on('requisicao-teste', (event) =>{
    console.log('vamos mamar Cabrito');
    event.sender.send('resposta-teste', 'resposta-teste');
});

// function sleep(milliseconds) {
//     var start = new Date().getTime();
//     for (var i = 0; i < 1e7; i++) {
//       if ((new Date().getTime() - start) > milliseconds){
//         break;
//       }
//     }
//   }