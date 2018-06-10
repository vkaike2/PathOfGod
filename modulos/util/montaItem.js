
module.exports = {
    montaMapa(conteudoItem){
        let nomeBase = "";
        let nome = "";
        let tier = "";
        let quality = "";
        let options = {
            reflect: ""
        }
        let blocoItem = conteudoItem.split("--------");
        let linhasBlocoA = blocoItem[0].split("\r\n"); // nome/rarity
        let linhasBlocoB = blocoItem[1].split("\r\n"); // tier/quantityI/rarityI/pack size/quality
        let linhasBlocoC = blocoItem[2].split("\r\n"); // item level
        let linhasBlocoD = blocoItem[3].split("\r\n"); // info

        if(linhasBlocoA[2] != "--------"){
            nome = linhasBlocoA[1];
            nomeBase = linhasBlocoA[2];
        }else{
            nomeBase = linhasBlocoA[1];
        }

        linhasBlocoB.forEach(linha => {
            if(linha.includes("Quality")){
                quality = linha.split(": ")[1];
                quality = quality.split("(")[0];
            }
            if(linha.includes("Tier")){
                tier = linha.split(": ")[1];
            }
        });
        
        linhasBlocoD.forEach(linha => {
            if(linha.includes("reflect")){
                options.reflect = linha;
            }

        });
        let dados = {
            nomeBase: nomeBase,
            nome: nome,
            tier: tier,
            quality: quality,
            options : {
                reflect: options.reflect
            }
        }

        return dados;
    }
}