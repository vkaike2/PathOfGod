
module.exports = {
    montaMapa(conteudoItem){
        let nomeBase = "";
        let nome = "";
        let tier = "";
        let quality = "";
        let options = {
            reflect: ""
        }
        let linhaItem = conteudoItem.split("\r\n");

        if(linhaItem[2] != "--------"){
            nome = conteudoItem.split("\r\n")[1];
            nomeBase = conteudoItem.split("\r\n")[2];
        }else{
            nomeBase = conteudoItem.split("\r\n")[1];
        }
        tier = conteudoItem.split("\r\n")[6];
        tier = tier.split(": ")[1]
        quality = conteudoItem.split("\r\n")[7];
        quality = quality.split(": ")[1];
        quality = quality.split("(")[0];

        if(conteudoItem.includes("reflect")){
            if(conteudoItem.includes("Elemental")){
                options.reflect = "Reflect elemental"
            }else{
                options.reflect = "Reflect physical"
            }
        }
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