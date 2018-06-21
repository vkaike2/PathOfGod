// const { app, BrowserWindow, ipcMain} = require('electron');
const data = require('./modulos/json/data');
const inputMap = require('./modulos/input/map/inputMap');
const controlaTelas = require('./modulos/input/view/controlaTelas');


let numTeclado = 0;
inputMap.mapHelper = false;

controlaTelas.iniciaMainWindow();

inputMap.esperaLeitura(numTeclado, data);

