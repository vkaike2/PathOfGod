let selectMod = $('.div-options');
let modsJaSelecionados = [];
let saveMapHelper = [];
let newSave = [];
let defaultConfig = false;

function iniciaConfig() {
    let dataLength = 0;
    $.getJSON("../config/map-helper.json", function (data) {
        $.each(data, function (key, val) {
            criaDivMod(val.text,val.color,'ocultar');
            if (val.show == 't') {
                saveMapHelper.push([val.text, val.color, val.search]);
            }
            $("<li/>", {
                text: val.search,
                "class": "option ocultar",
                value: val.text + '-' + val.color
            }).appendTo(selectMod);
            dataLength++;
        });
        if (dataLength == saveMapHelper.length) {
            defaultConfig = true;
        } else {
            newSave = saveMapHelper;
        }
    }).then(() => {
        newSave.forEach(function(mod){
            mostrarItemDivMod(mod[0]);
        });
    });

    $.getJSON("../config/timeout.json", function (timeout) {
        $('#map-helper-timeout').val(timeout.mapHelper / 1000);
    });

}

function criaDivMod(mod, cor, clas) {
    let id = "id-" + mod.replace(" ", "-").replace("'", "");
    $("<div/>", {
        "class": "div-mod "+clas,
        "id": id
    }).appendTo($('#mods-adicionados'));

    $('#' + id).addClass(cor);

    $("<span/>", {
        "class": "texto-mod",
        text: mod
    }).appendTo($('#' + id));;
}
function mostrarItemDivMod(string){
    $(".div-mod").each(function (index) {
        if($(this).children().text() == string){
            $(this).removeClass('ocultar');
        }
    });
}
function controlaAbas() {
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
}
function mostrarDivMod(){
    $(".div-mod").each(function (index) {
        $(this).removeClass('ocultar');
    });
}
function mostraCombobox(){
    selectMod.removeClass('ocultar');
    $(".option").each(function (index) {
        $(this).removeClass('ocultar');
    });
}

function mostraApenas(){
    newSave.forEach(mod => {
        $(".option").each(function (index) {
            let comboMod = $(this);
            if(mod[2] == comboMod.text()){
                comboMod.addClass('ocultar');
            }
        });
    });
}

function escondeCombobox(){
    selectMod.addClass('ocultar');
    $(".option").each(function (index) {
        $(this).addClass('ocultar');
    });
}

function aguardaRequisicao(){
    let { ipcRenderer } = require('electron');
    ipcRenderer.on('mapa-config-salvo-sucesso', (event)=>{
        alert('Save successful');
    });
}

iniciaConfig();
$(document).ready(function () {
    aguardaRequisicao();
    controlaAbas();
    onlyNumber($('.input-config-numeric'));

    let arrow = $('.div-arrow');
    arrow.click(function () {
        if (!arrow.children().hasClass('arrow-up')) {
            if (!defaultConfig) {
                mostraCombobox();
                mostraApenas();
            } else {
               mostraCombobox();
            }
        } else {
            escondeCombobox();
        }
        arrow.children().toggleClass('arrow-up')
    });

    let selectMap = $('#selectMap');
    selectMap.on('input', function (event) {
        if (!defaultConfig) {
            mostraCombobox();
            if(selectMap.val() == ""){
                escondeCombobox()
            }else{
                $(".option").each(function (index) {
                    if (!$(this).text().includes(selectMap.val().toUpperCase())) {
                        $(this).addClass('ocultar');
                    } 
                });
            }
            mostraApenas();
        } else {
           mostraCombobox();
           $(".option").each(function (index) {
            if (!$(this).text().includes(selectMap.val().toUpperCase())) {
                $(this).addClass('ocultar');
            } 
        });
        }
    });


    $('.option').click(function (event) {

        let textMod = event.currentTarget.attributes[1].nodeValue.split("-")[0];
        let cor = event.currentTarget.attributes[1].nodeValue.split("-")[1];
        let search = event.currentTarget.innerText;
        let save = [textMod, cor, search];
        console.log(newSave);
        newSave.push(save);
        console.log(newSave);
        $(".div-mod").each(function (index) {
            if($(this).children().text() == textMod){
                $(this).removeClass('ocultar');
            }
        });
        escondeCombobox();
        arrow.children().removeClass('arrow-up')
    });
    
    $(".div-mod").click(function(event){
        let indice = 0;
        newSave.forEach(mod => {
            if(mod[0] == event.currentTarget.innerText){
                newSave.splice(indice,1);
            }
            indice++;
        });
        $(".div-mod").each(function (index) {
            if($(this).children().text() == event.currentTarget.innerText){
                $(this).addClass('ocultar');
            }
        });
    });

    let salvar = $('#salvar-mapa-helper');
    salvar.click(function () {
        selectMod.removeClass('ocultar');
        let mapTimeout = $('#map-helper-timeout');
        ipcRenderer.send('atualiza-timeout', mapTimeout.val());
        console.log(newSave);
        ipcRenderer.send('atualiza-mapHelper', newSave);
    });
});