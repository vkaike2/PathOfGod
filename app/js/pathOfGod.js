const { ipcRenderer } = require('electron');

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