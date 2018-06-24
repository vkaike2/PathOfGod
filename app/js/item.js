function criaDivMod(mod,cor) {
    let id = "id-" + mod.replace(" ", "-");
    $("<div/>", {
        "class": "div-mod",
        "id": id
    }).appendTo($('#conteudo-item-dialog'));

    $('#' + id).addClass(cor);

    $("<span/>", {
        "class": "texto-mod",
        text: mod
    }).appendTo($('#' + id));;
}
function criaDivSafe() {
    $("<div/>", {
        "class": "div-safe-map",
        "id": "safe"
    }).appendTo($('#conteudo-item-dialog'));

    $("<span/>", {
        "class": "texto-safe",
        text: "Ta Safe!"
    }).appendTo($('#safe'));;
}

$.getJSON("../data/item.json", function (data) {
    $.getJSON("../config/map-helper.json", function (config) {
        $('#nomeItem').text(data.nomeBase.trim());

        if (data.quality.trim() != "") {
            $('#quality').text(data.quality.trim());
        } else {
            $('#quality').text("0%");
        }
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
                $.each(config, function (k, conf) {
                    if (conf.text == val) {
                        if (conf.show == "t") {
                            criaDivMod(val,conf.color);
                            temMod = true;
                        }
                    }

                });
            }
        });
        if (!temMod) {
            criaDivSafe();
        }
    });
});
