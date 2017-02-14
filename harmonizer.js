var _ = require("lodash"),
    uuidV4 = require('uuid/v4'),
    fs = require('fs');

module.exports = function(goblinDB) {
    var arrayEventos = [];
    fs.readdir('./datasource/output', function (err, files) {
        if(err){
            console.log("ERROR reading ./datasource/output:", err);
        } else {
            files.forEach(function(file){
                if (/.json/.test(file)) {
                    var currentArray = require(`./datasource/output/${file}`);
    
                    if (currentArray.length > 0) {
                        arrayEventos = _.concat(arrayEventos, currentArray);
                    }
                }
            });
    
            /*
                Filtering duplicate elements
                @see https://lodash.com/docs/4.17.4#uniqBy
            */
            arrayEventos = _.uniqBy(arrayEventos, "target_url");
    
            // adding UUIDs
            arrayEventos.forEach(function(event) {
                event.id = uuidV4();
            });
    
            goblinDB.set(arrayEventos, "events");
        }
    });

};