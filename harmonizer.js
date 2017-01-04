var _ = require("lodash"),
    uuidV4 = require('uuid/v4'),
    fs = require('fs'),
    evenbrite = require("./datasource/output/eventbrite.json"),
    campusMadrid = require("./datasource/output/campus_madrid.json"),
    firebase = require('firebase');

module.exports = function(){
    var arrayEventos = [];
    
    // Merging Arrays
    arrayEventos = campusMadrid.concat(evenbrite);
    
    // Clean the data
    evenbrite = campusMadrid = null; 
    
    
    /*
        Filtering duplicate elements
        @see https://lodash.com/docs/4.17.4#uniqBy
    */
    arrayEventos = _.uniqBy(arrayEventos, "target_url");
    
    // adding UUIDs
    arrayEventos.forEach(function(event){
        event.id = uuidV4()
    })
/*
    fs.writeFile('./final.json', JSON.stringify(arrayEventos , null, 4), function (err) {
        if (!err) {
            console.log('.output/final.json -- Actualizado!');
        } else {
            console.log('ERROR FATAL!! Al guardar ./final.json');
            throw err;
        }
    });
*/
    return arrayEventos;
};
