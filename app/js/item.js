function criaDivMod(mod){
    let div = "<div class='container-wrap'>"
    
        $( "<div/>", {
            "class": "div-mod",
            "id": "id-"+mod
        }).appendTo($('#conteudo-item-dialog'));

        $( "<span/>", {
            "class": "texto-mod",
            text: mod
        }).appendTo($('#id-'+mod));;
}

$(document).ready(function () {
    $.getJSON("../data/item.json", function (data) {
        criaDivMod('TESTE');
    });
});