
module.exports = {
    montaMapa(conteudoItem) {
        let tipoItem = "Mapa"
        let nomeBase = "";
        let nome = "";
        let tier = "";
        let quality = "";
        let packSize = "";
        let rarity = "";
        let quantity = "";
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
            avoidPoisonBlindBleed: "",
            hexproof: ""
        }

        let blocoItem = conteudoItem.split("--------");
        let linhasBlocoA = blocoItem[0].split("\r\n"); // nome/rarity
        let linhasBlocoB = blocoItem[1].split("\r\n"); // tier/quantityI/rarityI/pack size/quality
        let linhasBlocoC = blocoItem[2].split("\r\n"); // item level
        let linhasBlocoD = blocoItem[3].split("\r\n"); // info
     
        if (!linhasBlocoA[2].includes("")) {
            nome = linhasBlocoA[1];
            nomeBase = linhasBlocoA[2].replace("Superior ","");
        } else {
            nomeBase = linhasBlocoA[1].replace("Superior ","");
        }

        linhasBlocoB.forEach(linha => {
            if (linha.includes("Quality")) {
                quality = linha.split(": +")[1];
                quality = quality.split("(")[0];
            } else if (linha.includes("Tier")) {
                tier = linha.split(": ")[1];
            } else if (linha.includes("Pack Size")) {
                packSize = linha.split(": +")[1];
                packSize = packSize.split("(")[0];
            } else if (linha.includes("Item Rarity")) {
                rarity = linha.split(": +")[1];
                rarity = rarity.split("(")[0];
            } else if (linha.includes("Item Quantity")) {
                quantity = linha.split(": +")[1];
                quantity = quantity.split("(")[0];
            }
        });

        linhasBlocoD.forEach(linha => {
            if (linha.includes("reflect")) {
                if(linha.includes("Elemental")){
                    options.reflect = "Ele Reflect";
                }else{
                    options.reflect = "Phy Reflect";
                }
            } else if (linha.includes("inhabited")) {
                if(linha.includes("Rougue Exiles")){
                    options.inhabited = "Rougue Exiles";
                }else if(linha.includes("Skeletons")){
                    options.inhabited = "Skeletons";
                }else if(linha.includes("Goatmen")){
                    options.inhabited = "Goatmen";
                }else if(linha.includes("Sea Witches")){
                    options.inhabited = "Sea Witche";
                }else if(linha.includes("Undead")){
                    options.inhabited = "Undead";
                }else if(linha.includes("ranged")){
                    options.inhabited = "Ranged";
                }else if(linha.includes("Animals")){
                    options.inhabited = "Animals";
                }else if(linha.includes("Demons")){
                    options.inhabited = "Demons";
                }else if(linha.includes("Humanoids")){
                    options.inhabited = "Humanoids";
                }else if(linha.includes("Solaris")){
                    options.inhabited = "Solaris";
                }else if(linha.includes("Lunaris")){
                    options.inhabited = "Lunaris";
                }else if(linha.includes("Ghosts")){
                    options.inhabited = "Ghosts";
                }else if(linha.includes("Kitava")){
                    options.inhabited = "Kitava";
                }else if(linha.includes("Abominations")){
                    options.inhabited = "Abominations";
                }
            } else if (linha.includes("monster variety")) {
                options.monsterVariety = "Variety";
            } else if (linha.includes("two Unique")) {
                options.twoUniqueBoss = "2 Boss";
            } else if (linha.includes("Chain")) {
                options.chain = "Chain";
            } else if (linha.includes("Beyond")) {
                options.beyond = "Beyond";
            } else if (linha.includes("additional Projectiles")) {
                options.addProjectiles = "Add Proj";
            } else if (linha.includes("slowed below base speed")) {
                options.slowTaunt = "Slow Taunt";
            } else if (linha.includes("always Ignites")) {
                options.alwaysIgnite = "Alw Ignite";
            } else if (linha.includes("Totems")) {
                options.manyTotems = "Totem";
            } else if (linha.includes("Nemesis Mod")) {
                options.Nemesis = "Nemesis";
            } else if (linha.includes("cannot be Stunned")) {
                options.cannotStunLife = "Can't Stun";
            } else if (linha.includes("Physical Damage Reduction")) {
                options.physReduction = "Phys Reduction";
            } else if (linha.includes("more Monster Life")) {
                options.monsterLife = "Monster Life";
            } else if (linha.includes("increased Monster Damage")) {
                options.monsterDamage = "Monster Dmg";
            } else if (linha.includes("extra Damage as Fire")) {
                options.damageFire = "Fire Dmg";
            } else if (linha.includes("extra Damage as Cold")) {
                options.damageCold = "Cold Dmg";
            } else if (linha.includes("extra Damage as Lightning")) {
                options.damageLightning = "Light Dmg";
            } else if (linha.includes("Movement Speed")) {
                options.monsterMovementSpeed = "Monster Mov Spd";
            } else if (linha.includes("Attack Speed")) {
                options.monsterAttackSpeed = "Atk Spd";
            } else if (linha.includes("Cast Speed")) {
                options.monsterCastSpeed = "Cast Spd";
            } else if (linha.includes("Boss deals")) {
                options.uniqueDamage = "Boss Dmg";
            } else if (linha.includes(("Boss has")) && linha.includes("increased")) {
                options.uniqueSpeed = "Boss Spd";
            } else if (linha.includes("Boss has") && linha.includes("increased Life")) {
                options.uniqueLife = "Boss Life";
            } else if (linha.includes("Boss has") && linha.includes("Area of Effect")) {
                options.uniqueArea = "Boss Area";
            } else if (linha.includes("less effect of Curses")) {
                options.lessCurse = "Less Curse Effect";
            } else if (linha.includes("Chaos Res")) {
                options.chaosResistence = "Chaos Res";
            } else if (linha.includes("Elemental Res")) {
                options.elementalResistence = "Ele Res";
            } else if (linha.includes("avoid Poison")) {
                options.avoidPoisonBlindBleed = "Avoid";
            } else if (linha.includes("Hexproof")) {
                options.hexproof = "Hexproof";
            }
        });
        let dados = {
            tipoItem: tipoItem,
            nomeBase: nomeBase,
            nome: nome,
            tier: tier,
            packSize: packSize,
            rarity: rarity,
            quantity: quantity,
            quality: quality,
            options: {
                reflect: options.reflect,
                inhabited: options.inhabited,
                monsterVariety: options.monsterVariety,
                twoUniqueBoss: options.twoUniqueBoss,
                chain: options.chain,
                beyond: options.beyond,
                addProjectiles: options.addProjectiles,
                slowTaunt: options.slowTaunt,
                alwaysIgnite: options.alwaysIgnite,
                manyTotems: options.manyTotems,
                Nemesis: options.Nemesis,
                cannotStunLife: options.cannotStunLife,
                physReduction: options.physReduction,
                monsterLife: options.monsterLife,
                monsterDamage: options.monsterDamage,
                damageFire: options.damageFire,
                damageCold: options.damageCold,
                damageLightning: options.damageLightning,
                monsterMovementSpeed: options.monsterMovementSpeed,
                monsterAttackSpeed: options.monsterAttackSpeed,
                monsterCastSpeed: options.monsterCastSpeed,
                uniqueDamage: options.uniqueDamage,
                uniqueSpeed: options.uniqueSpeed,
                uniqueLife: options.uniqueLife,
                uniqueArea: options.uniqueArea,
                lessCurse: options.lessCurse,
                chaosResistence: options.chaosResistence,
                elementalResistence: options.elementalResistence,
                avoidPoisonBlindBleed: options.avoidPoisonBlindBleed,
                hexproof: options.hexproof
            }
        }

        return dados;
    }
}