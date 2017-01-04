var _ = require("lodash"),
  uuidV4 = require('uuid/v4'),
  fs = require('fs');

module.exports = function() {
  var arrayEventos = [];

  fs.readdir('./datasource/output', (err, files) => {
    files.forEach(file => {
      if (/.json/.test(file)) {
        var currentArray = require(`./datasource/output/${file}`);
        
        if (currentArray.length > 0) {
          arrayEventos = _.concat(arrayEventos, currentArray)
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

    fs.writeFile('./final.json', JSON.stringify(arrayEventos, null, 4), function(err) {
      if (!err) {
        console.log('.output/final.json -- Actualizado!');
      } else {
        console.log('ERROR FATAL!! Al guardar ./final.json');
        throw err;
      }
    });
  });

  return arrayEventos;
};