function decideCor(mod){
    switch(mod) {
        case "Ele Reflect":
            return "#000489";
        case "Phy Reflect":
            return "#890000";
        case "Variety":
            return "#1a3f28";
        case "2 Boss":
            return "#183044";
        case "Chain":
            return "#3e2944";
        case "Beyond":
            return "#301414";
        case "Add Proj":
            return "#440656";
        case "Slow Taunt":
            return "#494c2e";
        case "Alw Ignite":
            return "#9b0000";
        case "Totem":
            return "#303d29";
        case "Can't Stun":
            return "#3b3d29";
        case "Phys Reduction":
            return "#282b0f";
        case "Monster Life":
            return "#2b0e18";
        case "Monster Dmg":
            return "#59112a";
        case "Fire Dmg":
            return "#930202";
        case "Cold Dmg":
            return "#0d6eaa";
        case "Light Dmg":
            return "#897d0d";
        case "Atk Spd":
            return "#0d8913";
        case "Cast Spd":
            return "#453959";
        case "Boss Dmg":
            return "#414f3c";
        case "Boss Spd":
            return "#0d8913";
        case "Boss Life":
            return "#414f3c";
        case "Boss Area":
            return "#422428";
        case "Less Curse Effect":
            return "#370160";
        case "Chaos Res":
            return "#4e137a";
        case "Ele Res":
            return "#230d66";
        case "Avoid":
            return "#19660d";
        default:
            return "#3f321a"
    }
}

function criaDivMod(mod) {
    let cor = decideCor(mod);
    let id = "id-" + mod.replace(" ", "-");
    $("<div/>", {
        "class": "div-mod",
        "id": id
    }).appendTo($('#conteudo-item-dialog'));

    $('#' + id).css("background-color",cor);

    $("<span/>", {
        "class": "texto-mod",
        text: mod
    }).appendTo($('#' + id));;
}
function criaDivSafe(){
    $("<div/>", {
        "class": "div-safe-map",
        "id": "safe"
    }).appendTo($('#conteudo-item-dialog'));

    $("<span/>", {
        "class": "texto-safe",
        text: "Ta Safe!"
    }).appendTo($('#safe'));;
}
$(document).ready(function () {
    $.getJSON("../data/item.json", function (data) {
        // let pastaImagem = "./../image/map/";
        // let nomeImagem = data.nomeBase.replace("Map","").trim();
        // $('#imagem-item').attr("src",pastaImagem+nomeImagem+".png")
        $('#nomeItem').text(data.nomeBase.trim());
        $('#quality').text(data.quality);
        if (data.packSize.trim() != "") {
            $('#packSize').text(data.packSize.trim());
        } else {
            $('#packSize').text("0%");
        }
        if (data.rarity.trim() != "") {
            $('#rarity').text(data.rarity.trim());
        } else {
            $('#rarity').text("0%");
        }
        if (data.quantity.trim() != "") {
            $('#quantity').text(data.quantity.trim());
        } else {
            $('#quantity').text("0%");
        }
        let mods = data.options
        let temMod = false;
        $.each(mods, function (key, val) {
            if (val != "") {
                criaDivMod(val);
                temMod = true;
            }
        });
        if(!temMod){
            criaDivSafe();
        }
    });
});