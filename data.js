const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    salvaDados(conteudoItem){
        let arquivo = __dirname + '/data/item.json'; 
        if(fs.existsSync(arquivo)){
            this.adicionaItem(arquivo,conteudoItem);
        }else{
            this.criaArquivo(arquivo,{})
                .then(() =>{
                    this.adicionaItem(arquivo,conteudoItem);
            }); 
        }
    },
    adicionaItem(arquivo, conteudoArquivo){
        let raridade;
        raridade = conteudoArquivo.split("\r\n")[0]

        let dados = {
            rarity: raridade
        }
        jsonfile.writeFile(arquivo, dados, {spaces: 2})
                .then(()=>{
                    console.log('salvo com sucesso');
                }).catch((err)=>{
                    console.log(err);
        })
    },
    criaArquivo(arquivo, conteudoArquivo){
        return jsonfile.writeFile(arquivo, conteudoArquivo, {spaces: 2})
                .then(()=>{
                    console.log('arquivo criado');
                }).catch((err) =>{
                    console.log('erro');
                });
    }
};
