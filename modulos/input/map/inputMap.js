const { app,
    BrowserWindow,
    ipcMain,
    globalShortcut,
    clipboard,
    shell } = require('electron');

const path = require('path')
const data = require('../../json/data');
const montaItem = require('../../util/montaItem');
const fs = require('fs');

module.exports = {
    mapHelper: false,
    som: false,
    itemWinIsClosed: true,
    timeout: 1000,
    clipboardAntigo: "",
    utilizaSom: false,
    esperaLeituraSonora() {
        let caminhoSom = __dirname + '/../../../atalhoSom.ahk';
        shell.openItem(caminhoSom);

        globalShortcut.register('CmdOrCtrl+Space', () => {
            setTimeout(() => {
                this.leitura(true);
            }, 200);
        });
    },
    leitura(som) {
        if (this.clipboardAntigo != clipboard.readText('selection')) {
            if (clipboard.readText('selection').includes('Map')) {
                data.leMapHelperConfig().then(modsSalvos => {
                    let objectKeysArray = Object.keys(modsSalvos);
                    objectKeysArray.forEach(function (objKey) {
                        if (modsSalvos[objKey].show == "t") {
                            if (modsSalvos[objKey].compara.includes("/")) {
                                if (clipboard.readText('selection').includes(modsSalvos[objKey].compara.split("/")[0]) &&
                                    clipboard.readText('selection').includes(modsSalvos[objKey].compara.split("/")[1])) {
                                    if (som) {
                                        shell.beep();
                                    } else {
                                        montaItem.mudaSom();
                                    }
                                }
                            } else {
                                if (clipboard.readText('selection').includes(modsSalvos[objKey].compara)) {
                                    if (som) {
                                        shell.beep();
                                    } else {
                                        montaItem.mudaSom();
                                    }
                                }
                            }
                        }
                    });

                }).catch((err) => {
                    console.log(err);
                });
            }

        }
        this.clipboardAntigo = clipboard.readText('selection');
    },
    esperaLeituraVisual() {
        let caminho = __dirname + '/../../../atalhoSom.ahk';
        shell.openItem(caminho);
        globalShortcut.register('CmdOrCtrl+Space', () => {
            setTimeout(() => {
                this.leitura(false);
                setTimeout(() => {
                    if (montaItem.getVerific()) {
                        montaItem.mudaImagem();
                        data.salvaDados(clipboard.readText('selection'));
                        let itemWindow = null;
                        if (this.itemWinIsClosed != undefined) {
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
                                    this.numTeclado = false;
                                }, 200);
                            }, this.timeout);
                        }
                    }
                }, 200);
            }, 200);
        });
    },
    consultaView(mainWindow) {
        this.atualizaVisualizacao(null);
        this.atualizaTimeout(null);
        this.atualizaConfig(mainWindow);

        ipcMain.on('ativar-map', (event) => {
            this.mapHelper = true;
            if (!this.utilizaSom) {
                this.esperaLeituraVisual();
            } else {
                this.esperaLeituraSonora();
            }
        });
        ipcMain.on('desativar-map', (event) => {
            this.mapHelper = false;
            globalShortcut.unregister('CmdOrCtrl+Space');
            let caminhoFechar = __dirname + '/../../../fechaTudo.ahk';
            shell.openItem(caminhoFechar);

        });
        ipcMain.on('lbl-Index-req', () => {
            mainWindow.send('lbl-Index-Res', this.mapHelper);
        });
        this.toggleMapHelper(mainWindow);

        ipcMain.on('atualiza-timeout', (event, timeout) => {
            this.atualizaTimeout(timeout);
        });
        ipcMain.on('mapa-visualizacao', (event, visualizacao) => {
            this.atualizaVisualizacao(visualizacao);
        });

    },
    toggleMapHelper(mainWindow) {
        globalShortcut.register('CmdOrCtrl+Alt+F', () => {
            mainWindow.send('toggle-map-helper');
        });
    },
    atualizaVisualizacao(visualizacao) {
        if (visualizacao) {
            data.salvaViualizacaoMapa(visualizacao);
        }
        data.leViualizacaoMapa()
            .then(dados => {
                if (dados.utilizaSom == "t") {
                    this.utilizaSom = true;
                } else {
                    this.utilizaSom = false;
                }
            });
    },
    atualizaTimeout(timeout) {
        if (timeout && this.timeout != timeout) {
            data.salvaTimeout(timeout * 1000);
        }
        data.leTimeout()
            .then(dados => {
                if (dados.mapHelper >= 1000) {
                    this.timeout = dados.mapHelper;
                }
            }).catch((erro) => {
                console.log(erro);//precisa tratar o erro
            });
    },
    atualizaConfig(mainWindow) {
        ipcMain.on('atualiza-mapHelper', (event, novaConfig) => {

            data.leMapHelperConfig().then(modsSalvos => {

                let objectKeysArray = Object.keys(modsSalvos);
                objectKeysArray.forEach(function (objKey) {
                    modsSalvos[objKey].show = 'f';
                });
                novaConfig.forEach(function (novaC) {
                    objectKeysArray.forEach(function (objKey) {
                        if (novaC[2] == modsSalvos[objKey].search || modsSalvos[objKey].search == "UNDEFINED") {
                            modsSalvos[objKey].color = novaC[1];
                            modsSalvos[objKey].show = 't';
                        }
                    });
                });
                data.salvaMapHelperConfig(modsSalvos)
                    .then(() => {
                        console.log('salvo com sucesso');
                        mainWindow.send('mapa-config-salvo-sucesso');
                    });

            }).catch((err) => {
                console.log(err);
            });

        });
    }
}