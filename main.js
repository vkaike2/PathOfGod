const { app, BrowserWindow, ipcMain} = require('electron');
const data = require('./modulos/json/data');
const inputMap = require('./modulos/input/map/inputMap');

let numTeclado = 0;

app.on('ready', () => {
    console.log("Aplicacao iniciada");
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 800
        // frame: false
    });
    // mainWindow.setMenu(null);
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

inputMap.esperaLeitura(numTeclado,data);
inputMap.consultaView();


