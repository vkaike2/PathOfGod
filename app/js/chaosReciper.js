

let request;


let gloves = [];
let helmets = [];
let chests = [];
let belts = [];
let amulets = [];
let rings = [];
let oneHandWeapons = [];
let twoHandWeapons = [];
let bows = [];
let quivers = [];
let shields = [];

let categoriasPesquisadas = 0;

let recipesTotal;

let podeAtualiza = true;

//UTILS
function adcionaItem(category, listing) {
    let itemObj = {
        stash: listing.stash,
        category: category
    }
    return itemObj;
}

function montaArrayUrl(json) {
    let result = json.result;
    let qtdResultados = result.length;

    let arrayUrl = [];
    let urls = "";
    let count = 1;
    let maxRequisicao = 10;

    result.forEach(url => {
        if (count == qtdResultados) {
            urls += url;
            arrayUrl.push(urls);
        } else if (count < maxRequisicao) {
            urls += url + ",";
        } else if (count == maxRequisicao) {
            urls += url;
            arrayUrl.push(urls);
            urls = "";
            if (qtdResultados >= maxRequisicao) {
                maxRequisicao += 10;
            }
        }
        count++
    });
    return arrayUrl;
}

function limpaRecipe() {
    let recipe = {
        gloves: null,
        helmet: null,
        chest: null,
        bothHands: null,
        rightHand: null,
        leftHand: null,
        belt: null,
        firstRing: null,
        secondRing: null,
        amulet: null,
        bow: null,
        quiver: null
    }
    return recipe;
}

function montaRecipe() {
    let recipes = [];
    let recipe = {
        gloves: null,
        helmet: null,
        chest: null,
        bothHands: null,
        rightHand: null,
        leftHand: null,
        belt: null,
        firstRing: null,
        secondRing: null,
        amulet: null,
        bow: null,
        quiver: null
    }

    if (gloves.length > 0) {
        gloves.forEach((luva, index) => {
            if (recipes[index] == undefined) {
                recipe = limpaRecipe();
                recipe.gloves = luva;
                recipes.push(recipe);
            } else {
                recipes[index].gloves = luva;
            }
        });
    }

    if (helmets.length > 0) {
        helmets.forEach((capacete, index) => {
            if (recipes[index] == undefined) {
                recipe = limpaRecipe();
                recipe.helmet = capacete;
                recipes.push(recipe);
            } else {
                recipes[index].helmet = capacete;
            }
        })
    }

    if (chests.length > 0) {
        chests.forEach((armadura, index) => {
            if (recipes[index] == undefined) {
                recipe = limpaRecipe();
                recipe.chest = armadura;
                recipes.push(recipe);
            } else {
                recipes[index].chest = armadura;
            }
        });
    }

    if (twoHandWeapons.length != 0) {
        twoHandWeapons.forEach((twoHand, index) => {
            if (recipes[index] == undefined) {
                recipe = limpaRecipe();
                recipe.bothHands = twoHand;
                recipes.push(recipe);
            } else {
                recipes[index].bothHands = twoHand;
            }
        });
    }

    if (shields.length != 0) {
        shields.forEach((shield, index) => {
            if (recipes[index] == undefined) {
                recipe = limpaRecipe();
                recipe.leftHand = shield;
                recipes.push(recipe);
            } else {
                if (recipes[index].bothHands == null) {
                    recipes[index].leftHand = shield;
                }
            }
        });
    }

    if (oneHandWeapons.length != 0) {
        let qtdOneHand;
        if (oneHandWeapons.length % 2 == 0) {
            qtdOneHand = oneHandWeapons.length;
        } else {
            qtdOneHand = (oneHandWeapons.length - 1);
        }
        oneHandWeapons.forEach((oneHand, index) => {
            if (index >= (qtdOneHand / 2)) {
                let novoIndex = index - (qtdOneHand / 2);
                if (recipes[novoIndex].bothHands == null &&
                    recipes[novoIndex].leftHand == null) {
                    recipes[novoIndex].leftHand = oneHand;
                }
            } else if (recipes[index] == undefined) {
                recipe = limpaRecipe();
                recipe.leftHand = shield;
                recipes.push(recipe);
            } else {
                if (recipes[index].bothHands == null) {
                    recipes[index].rightHand = oneHand;
                }
            }
        });
    }

    if (rings.length != 0) {
        let qtdRings;
        if (rings.length % 2 == 0) {
            qtdRings = rings.length;
        } else {
            qtdRings = (rings.length - 1);
        }
        rings.forEach((anel, index) => {
            if (index >= (qtdRings / 2)) {
                let novoIndex = index - (qtdRings / 2);
                recipes[novoIndex].secondRing = anel;
            } else if (recipes[index] == undefined) {
                recipe = limpaRecipe();
                recipe.firstRing = anel;
                recipes.push(recipe);
            } else {
                recipes[index].firstRing = anel;
            }
        });
    }

    if (amulets.length != 0) {
        amulets.forEach((amuleto, index) => {
            if (recipes[index] == undefined) {
                recipe = limpaRecipe();
                recipe.amulet = amuleto;
                recipes.push(recipe);
            } else {
                recipes[index].amulet = amuleto;
            }
        });
    }

    if (belts.length != 0) {
        belts.forEach((cinto, index) => {
            if (recipes[index] == undefined) {
                recipe = limpaRecipe();
                recipe.belt = cinto;
                recipes.push(recipe);
            } else {
                recipes[index].belt = cinto;
            }
        });
    }

    if (bows.length != 0) {
        bows.forEach((bow, index) => {
            if (recipes[index] == undefined) {
                recipe = limpaRecipe();
                recipe.bow = bow;
                recipes.push(recipe);
            } else if (recipes[index].bothHands == null && recipes[index].rightHand == null
                && recipes[index].leftHand == null) {
                recipes[index].bow == bow;
            }
        })
    }

    if (quivers.length != 0) {
        quivers.forEach((quiver, index) => {
            if (recipes[index] == undefined) {
                recipe = limpaRecipe();
                recipe.quiver = quiver;
                recipes.push(recipe);
            } else if (recipes[index].bow != null) {
                recipes[index].quiver == quivers;
            }
        });
    }
    // console.log(recipes);
    recipesTotal = contaRecipes(recipes);
    // console.log(recipesTotal);
    atualizaElementos();
}

function contaRecipes(recipes) {
    let qtdRecipe = 0;
    let listRecipeSalva = [];
    recipes.forEach((recipe) => {
        if (recipe.gloves != null && recipe.helmet != null && recipe.chest != null &&
            recipe.belt != null && recipe.amulet != null) {
            if (recipe.firstRing != null && recipe.secondRing != null) {
                if (recipe.bothHands != null && recipe.rightHand == null && recipe.leftHand == null) {
                    listRecipeSalva.push(recipe);//2Hand Recipe
                } else if (recipe.bothHands == null && recipe.rightHand != null && recipe.leftHand != null) {
                    listRecipeSalva.push(recipe);//1Hand
                } else if (recipe.bow != null && recipe.quiver != null) {
                    listRecipeSalva.push(recipe);//bow
                }
            }
        }
    });
    // console.log(listRecipeSalva);
    return listRecipeSalva;
}
function pesquisaItens(arrayUrl, maxCategorias) {
    let indice = 0;
    if (arrayUrl.length == 0) {
        //nao possui tipo do iten
        categoriasPesquisadas++;
    } else {
        arrayUrl.forEach(tradeApiId => {
            jQuery.ajaxSetup({ async: false });
            $.get("https://www.pathofexile.com/api/trade/fetch/" + tradeApiId, function (data, status) {
                let itemResponse = data.result;
                itemResponse.forEach(element => {
                    let listing = element.listing;
                    let item = element.item;
                    if (element != null) {
                        if (listing.stash.name != 'anus') {
                            if (item.category.accessories) {
                                filtraAcessories(item, listing);
                            } else if (item.category.weapons) {
                                filtraWeapons(item, listing);
                            } else if (item.category.armour) {
                                filtraArmour(item, listing);
                            } else {
                                console.log("Item nao mapeado");
                            }
                        }
                    }
                });
            }).done(function () {
                indice++;
                if (indice == arrayUrl.length) {
                    categoriasPesquisadas++;
                    if (categoriasPesquisadas == maxCategorias) {
                        montaRecipe();
                    }
                }
            });
        });
    }
}

//BUSCAS
function buscaLadder() {
    $.get("https://www.pathofexile.com/api/trade/data/leagues", function (data, status) {
        // console.log(data);
    });
}

function buscaItens(accountName) {
    let tiposDeItem = [
        //armour
        "armour.gloves", "armour.helmet", "armour.chest", "armour.quiver", "armour.shield",
        //1h weapons
        "weapon.dagger", "weapon.wand", "weapon.onemace", "weapon.onesword", "weapon.oneaxe", "weapon.claw"
        , "weapon.sceptre",
        //2h weapons                                                                                           
        "weapon.twomace", "weapon.twoaxe", "weapon.staff", "weapon.twosword", "weapon.bow",
        //accessory                                 
        "accessory.belt", "accessory.ring", "accessory.amulet"
    ];

    tiposDeItem.forEach(tipoItem => {
        let data = {
            query: {
                status: {
                    option: "any"
                },
                stats: [
                    {
                        type: "and",
                        filters: [],
                        disabled: false
                    }
                ],
                filters: {
                    type_filters: {
                        filters: {
                            rarity: {
                                option: "rare"
                            },
                            category: {
                                option: tipoItem
                            }
                        },
                        disabled: false
                    },
                    misc_filters: {
                        filters: {
                            ilvl: {
                                min: 60
                            }
                        }
                    },
                    trade_filters: {
                        filters: {
                            account: {
                                input: accountName
                            }
                        }
                    }
                }
            },
            sort: {
                price: "asc"
            }
        }
        $.ajax({
            type: "POST",
            url: "https://www.pathofexile.com/api/trade/search/Hardcore%20Incursion",
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (json) {
                pesquisaItens(montaArrayUrl(json), tiposDeItem.length);
            }, error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });
}

//Filtros
function filtraArmour(item, listing) {
    // console.log(item.category);
    switch (item.category.armour[0]) {
        case "gloves":
            gloves.push(adcionaItem(item.category.armour[0], listing));
            break;
        case "helmet":
            helmets.push(adcionaItem(item.category.armour[0], listing));
            break;
        case "chest":
            chests.push(adcionaItem(item.category.armour[0], listing));
            break;
        case "quiver":
            quivers.push(adcionaItem(item.category.armour[0], listing));
            break;
        case "shield":
            shields.push(adcionaItem(item.category.armour[0], listing));
            break;
    }
}
function filtraWeapons(item, listing) {
    switch (item.category.weapons[0]) {
        case "dagger":
            oneHandWeapons.push(adcionaItem(item.category.weapons[0], listing));
            break;
        case "wand":
            oneHandWeapons.push(adcionaItem(item.category.weapons[0], listing));
            break;
        case "onemace":
            oneHandWeapons.push(adcionaItem(item.category.weapons[0], listing));
            break;
        case "onesword":
            oneHandWeapons.push(adcionaItem(item.category.weapons[0], listing));
            break;
        case "oneaxe":
            oneHandWeapons.push(adcionaItem(item.category.weapons[0], listing));
            break;
        case "claw":
            oneHandWeapons.push(adcionaItem(item.category.weapons[0], listing));
            break;
        case "sceptre":
            oneHandWeapons.push(adcionaItem(item.category.weapons[0], listing));
            break;
        case "twomace":
            twoHandWeapons.push(adcionaItem(item.category.weapons[0], listing));
            break;
        case "twoaxe":
            twoHandWeapons.push(adcionaItem(item.category.weapons[0], listing));
            break;
        case "staff":
            twoHandWeapons.push(adcionaItem(item.category.weapons[0], listing));
            break;
        case "twosword":
            twoHandWeapons.push(adcionaItem(item.category.weapons[0], listing));
            break;
        case "bow":
            bows.push(adcionaItem(item.category.weapons[0], listing));
            break;
    }
}
function filtraAcessories(item, listing) {

    switch (item.category.accessories[0]) {
        case "belt":
            belts.push(adcionaItem(item.category.accessories[0], listing));
            break;
        case "ring":
            rings.push(adcionaItem(item.category.accessories[0], listing));
            break;
        case "amulet":
            amulets.push(adcionaItem(item.category.accessories[0], listing))
            break;
    }
}
//Atualiza Elementos
function iniciaElementos() {
    $("#atualizar").addClass("button-basic-active");
    $('#helmets').text("...");
    $('#chests').text("...");
    $('#gloves').text("...");
    $('#rings').text("...");
    $('#amulets').text("...");
    $('#belts').text("...");
    $('#1hweapons').text("...");
    $('#2hweapons').text("...");
    $('#shields').text("...");
    $('#bows').text("...");
    $('#quivers').text("...");
    $('#total-recipes').text("...");
}
function atualizaElementos() {
    $('#helmets').text(helmets.length);
    $('#chests').text(gloves.length);
    $('#gloves').text(chests.length);
    $('#rings').text(rings.length);
    $('#amulets').text(amulets.length);
    $('#belts').text(belts.length);
    $('#1hweapons').text(oneHandWeapons.length);
    $('#2hweapons').text(twoHandWeapons.length);
    $('#shields').text(shields.length);
    $('#bows').text(bows.length);
    $('#quivers').text(quivers.length);
    $('#total-recipes').text(recipesTotal.length);

    $("#atualizar").removeClass("button-basic-active");
    podeAtualiza = true;

}

function limpaTudo() {
    gloves = [];
    helmets = [];
    chests = [];
    belts = [];
    amulets = [];
    rings = [];
    oneHandWeapons = [];
    twoHandWeapons = [];
    bows = [];
    quivers = [];
    shields = [];
}
$(document).ready(function () {

    // limpaTudo();
    iniciaElementos();
    buscaItens("vk41k32006");

    $("#atualizar").click(function () {
        if (podeAtualiza) {
            location.reload();
            podeAtualiza = false;
        }
    });

});