let selectMod = $('.div-options');
let modsJaSelecionados = [];
let saveMapHelper = [];

function iniciaCombobox() {

    $.getJSON("../config/map-helper.json", function (data) {
        $.each(data, function (key, val) {
            $("<li/>", {
                text: val.search,
                "class": "option ocultar",
                value: val.text + '-' + val.color
            }).appendTo(selectMod);
        });
    }).then(() => {

    });
}
function onlyNumber() {
    $('.input-config-numeric').on('input', function (event) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

}
function atualizaComponentes() {
    $.getJSON("../config/timeout.json", function (timeout) {
        $('#map-helper-timeout').val(timeout.mapHelper / 1000);
    });
}

function criaDivMod(mod,cor) {
    let id = "id-" + mod.replace(" ", "-").replace("'","");
    $("<div/>", {
        "class": "div-mod",
        "id": id
    }).appendTo($('#mods-adicionados'));

    $('#' + id).addClass(cor);

    $("<span/>", {
        "class": "texto-mod",
        text: mod
    }).appendTo($('#' + id));;
}


iniciaCombobox();
$(document).ready(function () {
    onlyNumber();
    atualizaComponentes();

    let howToLink = $('#how-to-link');
    let howtoDiv = $('#how-to-div');
    let configLink = $("#config-link");
    let configDiv = $('#config-div');

    howToLink.click(function () {
        if (!howToLink.hasClass('tab-selecionada')) {
            howToLink.addClass('tab-selecionada');
            configLink.removeClass('tab-selecionada');
            if (howtoDiv.hasClass('div-config-oculta')) {
                howtoDiv.removeClass('div-config-oculta');
                configDiv.addClass('div-config-oculta');
            }
        }
    });

    configLink.click(function () {
        if (!configLink.hasClass('tab-selecionada')) {
            configLink.addClass('tab-selecionada');
            howToLink.removeClass('tab-selecionada')
            if (configDiv.hasClass('div-config-oculta')) {
                configDiv.removeClass('div-config-oculta');
                howtoDiv.addClass('div-config-oculta');
            }
        }
    });

    let selectMap = $('#selectMap');

    selectMap.on('input', function (event) {
        selectMod.removeClass('ocultar');
        $(".option").each(function (index) {
            if ($(this).text().includes(selectMap.val().toUpperCase())) {
                $(this).removeClass('ocultar');
            } else {
                $(this).addClass('ocultar');
            }
        });
    });

    let arrow = $('.div-arrow');
    arrow.click(function () {
        selectMod.removeClass('ocultar');
        $(".option").each(function (index) {
            $(this).removeClass('ocultar');
        });
    });

    $('.option').click(function (event) {
        console.log(event.currentTarget.innerText);
        let textMod = event.currentTarget.attributes[1].nodeValue.split("-")[0];
        let cor = event.currentTarget.attributes[1].nodeValue.split("-")[1];
        
        if(modsJaSelecionados.length > 0){
            modsJaSelecionados.forEach(mod => {
                if(mod == event.currentTarget.innerText){
                    alert('Really, again?');
                    return;
                }
            });
        }
        modsJaSelecionados.push(event.currentTarget.innerText)
        let save = [textMod, cor];
        saveMapHelper.push(save);
        criaDivMod(textMod,cor);

        $(".option").each(function (index) {
            $(this).addClass('ocultar');
        });
        selectMod.addClass('ocultar');
    });

    let salvar = $('#salvar-mapa-helper');
    salvar.click(function () {
        let mapTimeout = $('#map-helper-timeout');
        ipcRenderer.send('atualiza-timeout', mapTimeout.val());
        ipcRenderer.send('atualiza-mapHelper', saveMapHelper);
    });
});