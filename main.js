const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');


app.on('ready', () => {
    console.log("Aplicacao iniciada");
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 800
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

//Exemplo de atalho
app.on('ready', () => {
    globalShortcut.register('CommandOrControl+X', () => {
      console.log('CommandOrControl+X is pressed')
    })
});

//Exemplo de requisicao
ipcMain.on('requisicao-teste', () =>{
    console.log('vamos mamar Cabrito');
});