const { app, BrowserWindow, ipcMain, globalShortcut, clipboard, shell} = require('electron');
const data = require('./data');

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
        console.log(clipboard.readText('selection'));
        data.salvaDados(clipboard.readText('selection'));
    })
});


ipcMain.on('requisicao-teste', (event) =>{
    console.log('vamos mamar Cabrito');
});