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

$(document).ready(function () {
    controlaAbas();
});

