
module.exports = {
    montaMapa(conteudoItem){
        let nomeBase = "";
        let nome = "";
        let tier = "";
        let quality = "";
        let options = {
            reflect: "",
            inhabited: "",
            monsterVariety: "",
            twoUniqueBoss: "",
            chain: "",
            beyond: "",
            addProjectiles: "",
            slowTaunt: "",
            alwaysIgnite: "",
            manyTotems: "",
            Nemesis: "",
            cannotStunLife: "",
            physReduction: "",
            monsterLife: "",
            monsterDamage: "",
            damageFire: "",
            damageCold: "",
            damageLightning: "",
            monsterMovementSpeed: "",
            monsterAttackSpeed: "",
            monsterCastSpeed: "",
            uniqueDamage: "",
            uniqueSpeed: "",
            uniqueLife: "",
            uniqueArea: "",
            lessCurse: "",
            chaosResistence: "",
            elementalResistence: "",
            avoidPoisonBlindBleed:""
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
            }else if(linha.includes("Tier")){
                tier = linha.split(": ")[1];
            }
        });
        
        linhasBlocoD.forEach(linha => {
            if(linha.includes("reflect")){
                options.reflect = linha;
            }else if(linha.includes("inhabited")){
                options.inhabited = linha;
            }else if(linha.includes("monster variety")){
                options.monsterVariety = linha;
            }else if(linha.includes("two Unique")){
                options.twoUniqueBoss = linha;
            }else if(linha.includes("Chain")){
                options.chain = linha;
            }else if(linha.includes("Beyond")){
                options.beyond = linha;
            }else if(linha.includes("additional Projectiles")){
                options.addProjectiles = linha;
            }else if(linha.includes("slowed below base speed")){
                options.slowTaunt = linha;
            }else if(linha.includes("always Ignites")){
                options.alwaysIgnite = linha;
            }else if(linha.includes("Totems")){
                options.manyTotems = linha;
            }else if(linha.includes("Nemesis Mod")){
                options.Nemesis = linha;
            }else if(linha.includes("cannot be Stunned")){
                option.cannotStunLife = linha;
            }else if(linha.includes("Physical Damage Reduction")){
                option.physReduction = linha;
            }else if(linha.includes("more Monster Life")){
                option.monsterLife = linha;
            }else if(linha.includes("increased Monster Damage")){
                option.monsterDamage = linha;
            }else if(linha.includes("extra Damage as Fire")){
                option.damageFire = linha;
            }else if(linha.includes("extra Damage as Cold")){
                option.damageCold
            }else if(linha.includes("extra Damage as Lightning")){
                option.damageLightning = linha;
            }else if(linha.includes("Movement Speed")){
                option.monsterMovementSpeed = linha;
            }else if(linha.includes("Attack Speed")){
                option.monsterAttackSpeed = linha;
            }else if(linha.includes("Cast Speed")){
                option.monsterCastSpeed = linha;
            }else if(linha.includes("Boss deals")){
                option.uniqueDamage = linha;
            }else if(linha.includes(("Boss has")) && linha.includes("increased")){
                option.uniqueSpeed = linha;
            }else if(linha.includes("Boss has") && linha.includes("increased Life")){
                option.uniqueLife = linha;
            }else if(linha.includes("Boss has") && linha.includes("Area of Effect")){
                option.uniqueArea = linha;
            }else if(linha.includes("less effect of Curses")){
                option.lessCurse = linha;
            }else if(linha.includes("Chaos Resistence")){
                option.chaosResistence = linha;
            }else if(linha.includes("Elemental Resistence")){
                option.elementalResistence = linha;
            }else if(linha.includes("to avoid Poison")){
                option.avoidPoisonBlindBleed = linha;
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