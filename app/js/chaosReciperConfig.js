let stashsParaProcurar = [];

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
function addStash(stash){
    $('<div/>',{
        "class":"div-stash",
        "id":`id-${stash}`,
        'onclick': `removeStash('id-${stash}')`
    }).appendTo($('#div-stashes'));

    $("<span/>", {
        "class": "texto-mod",
        text: stash
    }).appendTo($(`#id-${stash}`));
}

function removeStash(id){
    $(`#${id}`).addClass("ocultar");
}

function iniciaValores(){
    $.getJSON("../config/chaos-reciper-config.json", function (data) {
        console.log(data);
        $('#account-name').val(data.accountName);
        data.stashes.forEach(stash => {
            stashsParaProcurar.push(stash);
            addStash(stash);
        });
    });
}

$(document).ready(function () {
    controlaAbas();
    iniciaValores();
    $('#add-stash').click(function(){
        let stashes = $('#stashes');
        if(stashes.val() == "" || stashes.val() == undefined){
            alert('Please write at last one stash name');
        }else{
            stashsParaProcurar.push(stashes.val());
            addStash(stashes.val());
            stashes.val("");
        } 
    });

    $('#salvar-chaos-reciper').click(function(){
        let dados = {
            accountName: "",
            stashes: []
        }
        dados.accountName = $('#account-name').val();
        dados.stashes = stashsParaProcurar;
        console.log(dados);

        ipcRenderer.send('atualiza-chaosReciper',dados)
    });
    ipcRenderer.on('feedback-salvar',()=>{
        alert('salvo com sucesso');
    });
});

