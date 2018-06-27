
module.exports = {
    verific: false,
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
            nemesis: "",
            cannotStun: "",
            physReduction: "",
            monsterLife: "",
            monsterDamage: "",
            damageFire: "",
            damageCold: "",
            damageLightning: "",
            monsterSpeed: "",
            uniqueDamage: "",
            uniqueSpeed: "",
            uniqueLife: "",
            uniqueArea: "",
            lessCurse: "",
            chaosResistence: "",
            elementalResistence: "",
            avoidPoisonBlindBleed: "",
            hexproof: "",
            equilibrium: "",
            bloodline: "",
            magicMonster: "",
            pointBlank: "",
            poisonHit: "",
            critChance: "",
            critMulti: "",
            ground: "",
            redFlaskCharg: "",
            monsterArea: "",
            lessArea: "",
            avoidStatus: "",
            playerDodge: "",
            monsterAccuracy: "",
            recoveryRate: "",
            lessArmour: "",
            redBlockChance: "",
            redDmgCrit: "",
            rareMonster: "",
            cursed: "",
            minusMax: "",
            cannotRegen: "",
            cannotLeech: "",
            monsterCauseStatus: "",
            frenziCharge: "",
            powerCharge: "",
            unidentified: ""
        }

        let blocoItem = conteudoItem.split("--------");
        let linhasBlocoA = blocoItem[0].split("\r\n"); // nome/rarity
        let linhasBlocoB = blocoItem[1].split("\r\n"); // tier/quantityI/rarityI/pack size/quality
        let linhasBlocoC = blocoItem[2].split("\r\n"); // item level
        let linhasBlocoD = blocoItem[3].split("\r\n"); // info

        if (!linhasBlocoA[2] == "") {
            nome = linhasBlocoA[1];
            nomeBase = linhasBlocoA[2].replace("Superior ", "").replace("Map", "");
        } else {
            nomeBase = linhasBlocoA[1].replace("Superior ", "").replace("Map", "");
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
            let nuTier = tier.trim();
            if (linha.includes("Unidentified")) {
                options.unidentified = "Unidentified";
            } else {
                if (nuTier >= 6) {//t 6 - 16
                    if (linha.includes("Cursed")) {
                        if (linha.includes("Elemental")) {
                            options.cursed = "Ele Weakness";
                        } else if (linha.includes("Enfeeble")) {
                            options.cursed = "Enfeeble";
                        } else if (linha.includes("Temporal")) {
                            options.cursed = "Temp Chains";
                        } else if (linha.includes("Vulnerability")) {
                            options.cursed = "Vulnerability";
                        }
                    } else if (linha.includes("maximun Player")) {
                        options.minusMax = "Minus Max";
                    } else if (linha.includes("cannot Regenerate")) {
                        options.cannotRegen = "Cannot Regen";
                    } else if (linha.includes("cause Status") && linha.includes("Monsters")) {
                        options.monsterCauseStatus = "Chance Ailments";
                    }
                    if (nuTier >= 11) {//t 11 - 16
                        if (linha.includes("Cannot Leech")) {
                            options.cannotLeech = "Cannot Leech";
                        } else if (linha.includes("Hexproof")) {
                            options.hexproof = "Hexproof";
                        }
                    }
                } 
                // t 1 - 16
                if (linha.includes("reflect")) {
                    if (linha.includes("Elemental")) {
                        options.reflect = "Ele Reflect";
                    } else {
                        options.reflect = "Phy Reflect";
                    }
                } else if (linha.includes("inhabited")) {
                    if (linha.includes("Rougue Exiles")) {
                        options.inhabited = "Rougue Exiles";
                    } else if (linha.includes("Skeletons")) {
                        options.inhabited = "Skeletons";
                    } else if (linha.includes("Goatmen")) {
                        options.inhabited = "Goatmen";
                    } else if (linha.includes("Sea Witches")) {
                        options.inhabited = "Sea Witche";
                    } else if (linha.includes("Undead")) {
                        options.inhabited = "Undead";
                    } else if (linha.includes("ranged")) {
                        options.inhabited = "Ranged";
                    } else if (linha.includes("Animals")) {
                        options.inhabited = "Animals";
                    } else if (linha.includes("Demons")) {
                        options.inhabited = "Demons";
                    } else if (linha.includes("Humanoids")) {
                        options.inhabited = "Humanoids";
                    } else if (linha.includes("Solaris")) {
                        options.inhabited = "Solaris";
                    } else if (linha.includes("Lunaris")) {
                        options.inhabited = "Lunaris";
                    } else if (linha.includes("Ghosts")) {
                        options.inhabited = "Ghosts";
                    } else if (linha.includes("Kitava")) {
                        options.inhabited = "Kitava";
                    } else if (linha.includes("Abominations")) {
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
                    options.nemesis = "Nemesis";
                    options.rareMonster = "Rare Monsters";
                } else if (linha.includes("Physical Damage Reduction")) {
                    options.physReduction = "Phys Reduction";
                } else if (linha.includes("more Monster Life")) {
                    options.cannotStun = "Cannot Stun";
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
                    options.monsterSpeed = "Monster speed";
                } else if (linha.includes("Boss deals")) {
                    options.uniqueDamage = "Boss Dmg";
                } else if (linha.includes(("Boss has")) && linha.includes("increased")) {
                    options.uniqueSpeed = "Boss Spd";
                } else if (linha.includes("Boss has") && linha.includes("increased Life")) {
                    options.uniqueLife = "Boss Life";
                    options.uniqueArea = "Boss Area";
                } else if (linha.includes("less effect of Curses")) {
                    options.lessCurse = "Less Curse Effect";
                } else if (linha.includes("Chaos Res")) {
                    options.chaosResistence = "Chaos Res";
                    options.elementalResistence = "Ele Res";
                } else if (linha.includes("avoid Poison")) {
                    options.avoidPoisonBlindBleed = "Avoid Poison Bleed";
                } else if (linha.includes("Equilibrium")) {
                    options.equilibrium = "Ele Equilibrium";
                } else if (linha.includes("Bloodline")) {
                    options.bloodline = "Bloodline";
                    options.magicMonster = "More Magic";
                } else if (linha.includes("Point Blank")) {
                    options.pointBlank = "Point Blank";
                } else if (linha.includes("Poison on Hit")) {
                    options.poisonHit = "Poison on Hit";
                } else if (linha.includes("Critical Strike Chance")) {
                    options.critChance = "Crit Chance";
                    options.critMulti = "Crit Multi";
                } else if (linha.includes("ground")) {
                    if (linha.includes("desecrated")) {
                        options.ground = "Desecrated";
                    } else if (linha.includes("burning")) {
                        options.ground = "Burning";
                    } else if (linha.includes("chilled")) {
                        options.ground = "Chilled";
                    } else if (linha.includes("shocking")) {
                        options.ground = "Shocking";
                    }
                } else if (linha.includes("reduced flask")) {
                    options.redFlaskCharg = "Redu. flask";
                } else if (linha.includes("Monsters") && linha.includes("Area")) {
                    options.monsterArea = "Monster Area";
                } else if (linha.includes("less Area")) {
                    options.lessArea = "Less Area";
                } else if (linha.includes("Avoid Elemental")) {
                    options.avoidStatus = "Avoid Ailments";
                } else if (linha.includes("Player Dodge")) {
                    options.playerDodge = "Less Dodge";
                    options.monsterAccuracy = "Monster Accuracy";
                } else if (linha.includes("reduced Block Chance")) {
                    options.redBlockChance = "Redu Block";
                    options.lessArmour = "Less Armour";
                } else if (linha.includes("Rate of Life and Energy")) {
                    options.recoveryRate = "Recovery Life ES";
                } else if (linha.includes("reduced Extra Damage from Critical Strikes")) {
                    options.redDmgCrit = "Monster Redu Dmg Crit";
                } else if (linha.includes("Charge on Hit")) {
                    options.powerCharge = "Power Charge";
                    options.frenziCharge = "Frenzi Charge";
                }

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
                inhabited: options.inhabited,
                monsterVariety: options.monsterVariety,
                twoUniqueBoss: options.twoUniqueBoss,
                chain: options.chain,
                alwaysIgnite: options.alwaysIgnite,
                beyond: options.beyond,
                nemesis: options.nemesis,
                rareMonster: options.rareMonster,
                slowTaunt: options.slowTaunt,
                physReduction: options.physReduction,
                damageFire: options.damageFire,
                damageCold: options.damageCold,
                damageLightning: options.damageLightning,
                monsterLife: options.monsterLife,
                avoidPoisonBlindBleed: options.avoidPoisonBlindBleed,
                reflect: options.reflect,
                uniqueDamage: options.uniqueDamage,
                uniqueSpeed: options.uniqueSpeed,
                elementalResistence: options.elementalResistence,
                monsterDamage: options.monsterDamage,
                addProjectiles: options.addProjectiles,
                uniqueLife: options.uniqueLife,
                uniqueArea: options.uniqueArea,
                cannotStunLife: options.cannotStun,
                manyTotems: options.manyTotems,
                monsterSpeed: options.monsterSpeed,
                lessCurse: options.lessCurse,
                chaosResistence: options.chaosResistence,
                hexproof: options.hexproof,
                equilibrium: options.equilibrium,
                bloodline: options.bloodline,
                magicMonster: options.magicMonster,
                pointBlank: options.pointBlank,
                poisonHit: options.poisonHit,
                critChance: options.critChance,
                critMulti: options.critMulti,
                ground: options.ground,
                redFlaskCharg: options.redFlaskCharg,
                monsterArea: options.monsterArea,
                lessArea: options.lessArea,
                avoidStatus: options.avoidStatus,
                playerDodge: options.playerDodge,
                monsterAccuracy: options.monsterAccuracy,
                redBlockChance: options.redBlockChance,
                lessArmour: options.lessArmour,
                recoveryRate: options.recoveryRate,
                redDmgCrit: options.redDmgCrit,
                cursed: options.cursed,
                minusMax: options.minusMax,
                cannotLeech: options.cannotLeech,
                cannotRegen: options.cannotRegen,
                monsterCauseStatus: options.monsterCauseStatus,
                frenziCharge: options.frenziCharge,
                powerCharge: options.powerCharge,
                unidentified: options.unidentified
            }
        }

        return dados;
    },
    getVerific(){//verificar
        return this.verific;
    },mudaSom(){
        this.verific = true;
    },mudaImagem(){
        this.verific = false;
    }
}