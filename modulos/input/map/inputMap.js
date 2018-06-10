const { app, 
    BrowserWindow, 
    ipcMain, 
    globalShortcut, 
    clipboard, 
    shell} = require('electron');

module.exports = {
    esperaLeitura(numTeclado,data){
        app.on('ready', () => {
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
                setTimeout(() => {
                    console.log(clipboard.readText('selection'));
                    data.salvaDados(clipboard.readText('selection'));
        
                    let itemWindow = null;
                    itemWindow = new BrowserWindow({
                        width: 200,
                        height: 300,
                        alwaysOnTop : true,
                        transparent: true,
                        frame: false
                    });
                    itemWindow.loadURL(`file://${__dirname}/app/item.html`);
            
                    setTimeout(() => {itemWindow.close();}, 1000);
                }, 200);
            })
        });
    }
}