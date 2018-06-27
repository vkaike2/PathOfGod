const jsonfile = require('jsonfile-promised');
const fs = require('fs');
const montaItem = require('./../util/montaItem');

module.exports = {
    salvaDados(conteudoItem) {
        let arquivo = __dirname + '/../../data/item.json';
        if (fs.existsSync(arquivo)) {
            this.adicionaItem(arquivo, conteudoItem);
        } else {
            this.criaArquivo(arquivo, {})
                .then(() => {
                    this.adicionaItem(arquivo, conteudoItem);
                });
        }
    },
    adicionaItem(arquivo, conteudoArquivo) {
        let dados;
        if (!conteudoArquivo.includes(" Map ")) {
            dados = {
                erro: "Thats not a map"
            }
        } else {
            dados = montaItem.montaMapa(conteudoArquivo);
        }

        jsonfile.writeFile(arquivo, dados, { spaces: 2 })
            .catch((err) => {
                console.log(err);
            });
    },
    criaArquivo(arquivo, conteudoArquivo) {
        return jsonfile.writeFile(arquivo, conteudoArquivo, { spaces: 2 })
            .catch((err) => {
                console.log(err);
            });
    },
    leTimeout() {
        return jsonfile.readFile(__dirname + '/../../config/timeout.json')
    },
    salvaTimeout(mapTimeout) {
        dados = {
            mapHelper: mapTimeout
        }
        jsonfile.writeFile(__dirname + '/../../config/timeout.json', dados, { spaces: 2 })
            .catch((err) => {
                console.log(err);
            });
    }, 
    leMapHelperConfig() {
        return jsonfile.readFile(__dirname + '/../../config/map-helper.json');
    }, 
    salvaMapHelperConfig(dados) {
        return jsonfile.writeFile(__dirname + '/../../config/map-helper.json', dados, { spaces: 2 })
            .catch((err) => {
                console.log(err);
            });
        
    },
    leViualizacaoMapa(){
        return jsonfile.readFile(__dirname + '/../../config/visualSonora.json');
    },
    salvaViualizacaoMapa(visualizacao){
        dados = {
            utilizaSom: visualizacao
        }
        return jsonfile.writeFile(__dirname + '/../../config/visualSonora.json', dados, { spaces: 2 })
        .catch((err) => {
            console.log(err);
        });
    }
};
