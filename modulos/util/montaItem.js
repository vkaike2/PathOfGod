
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

        if (linhasBlocoA[2] != "--------") {
            nome = linhasBlocoA[1];
            nomeBase = linhasBlocoA[2];
        } else {
            nomeBase = linhasBlocoA[1];
        }

        linhasBlocoB.forEach(linha => {
            if (linha.includes("Quality")) {
                quality = linha.split(": ")[1];
                quality = quality.split("(")[0];
            } else if (linha.includes("Tier")) {
                tier = linha.split(": ")[1];
            } else if (linha.includes("Pack Size")) {
                packSize = linha.split(": ")[1];
                packSize = quality.split("(")[0];
            } else if (linha.includes("Item Rarity")) {
                rarity = linha.split(": ")[1];
                rarity = quality.split("(")[0];
            } else if (linha.includes("Item Quantity")) {
                quality = linha.split(": ")[1];
                quality = quality.split("(")[0];
            }
        });

        linhasBlocoD.forEach(linha => {
            if (linha.includes("reflect")) {
                options.reflect = linha;
            } else if (linha.includes("inhabited")) {
                options.inhabited = linha;
            } else if (linha.includes("monster variety")) {
                options.monsterVariety = linha;
            } else if (linha.includes("two Unique")) {
                options.twoUniqueBoss = linha;
            } else if (linha.includes("Chain")) {
                options.chain = linha;
            } else if (linha.includes("Beyond")) {
                options.beyond = linha;
            } else if (linha.includes("additional Projectiles")) {
                options.addProjectiles = linha;
            } else if (linha.includes("slowed below base speed")) {
                options.slowTaunt = linha;
            } else if (linha.includes("always Ignites")) {
                options.alwaysIgnite = linha;
            } else if (linha.includes("Totems")) {
                options.manyTotems = linha;
            } else if (linha.includes("Nemesis Mod")) {
                options.Nemesis = linha;
            } else if (linha.includes("cannot be Stunned")) {
                options.cannotStunLife = linha;
            } else if (linha.includes("Physical Damage Reduction")) {
                options.physReduction = linha;
            } else if (linha.includes("more Monster Life")) {
                options.monsterLife = linha;
            } else if (linha.includes("increased Monster Damage")) {
                options.monsterDamage = linha;
            } else if (linha.includes("extra Damage as Fire")) {
                options.damageFire = linha;
            } else if (linha.includes("extra Damage as Cold")) {
                options.damageCold
            } else if (linha.includes("extra Damage as Lightning")) {
                options.damageLightning = linha;
            } else if (linha.includes("Movement Speed")) {
                options.monsterMovementSpeed = linha;
            } else if (linha.includes("Attack Speed")) {
                options.monsterAttackSpeed = linha;
            } else if (linha.includes("Cast Speed")) {
                options.monsterCastSpeed = linha;
            } else if (linha.includes("Boss deals")) {
                options.uniqueDamage = linha;
            } else if (linha.includes(("Boss has")) && linha.includes("increased")) {
                options.uniqueSpeed = linha;
            } else if (linha.includes("Boss has") && linha.includes("increased Life")) {
                options.uniqueLife = linha;
            } else if (linha.includes("Boss has") && linha.includes("Area of Effect")) {
                options.uniqueArea = linha;
            } else if (linha.includes("less effect of Curses")) {
                options.lessCurse = linha;
            } else if (linha.includes("Chaos Resistence")) {
                options.chaosResistence = linha;
            } else if (linha.includes("Elemental Resistence")) {
                options.elementalResistence = linha;
            } else if (linha.includes("to avoid Poison")) {
                options.avoidPoisonBlindBleed = linha;
            } else if (linha.includes("Hexproof")) {
                options.hexproof = linha;
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