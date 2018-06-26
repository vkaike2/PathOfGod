const { ipcRenderer } = require('electron');

function onlyNumber(object) {
    object.on('input', function (event) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

$(document).ready(function() {
    $('#menu-home').click(function(){
        window.location.replace("./index.html");
    });
    $('#menu-map').click(function(){
        window.location.replace("./mapConfig.html");
    });
    $('#menu-reciper').click(function(){
    });
    
});