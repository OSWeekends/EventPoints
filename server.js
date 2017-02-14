var exec = require('child_process').exec,
    fs = require('fs'),
    project = require('pillars'),
    Scheduled = require("scheduled"),
    GDB = require("goblindb"),
    config = require('./config'),
    harmonizer = require("./harmonizer.js");

// Goblin Setup
var goblinDB = GDB();

// Bring data from datasources
var data = goblinDB.get("events");

// Starting the project
project.services.get('http').configure({
    port: process.env.PORT || 3000
}).start();

// Define Rutes
var apiRoute = new Route({
    id: 'staticRoute',
    path: '/api',
    cors: true
}, function(gw) {
    gw.redirect("/");
});

var apiEventsRoute = new Route({
    id: 'staticRoute',
    path: 'api/events',
    cors: true
}, function(gw) {
    gw.json(data, {
        deep: 10
    });
});

var staticRoute = new Route({
    id: 'staticRoute',
    path: '/*:path',
    directory: {
        path: './app',
        listing: true
    }
});

// Adding routes objects to the project
project.routes.add(apiEventsRoute);
project.routes.add(apiRoute);
project.routes.add(staticRoute);

// Cron Tasks
var pythonRocks = new Scheduled({
    id: "pythonRocks",
    pattern: "45 18 * * * *",
    task: function() {
        fs.readdir('./datasource/', function (err, files) {
            if(err){
                console.log("ERROR reading ./datasource/:", err);
            } else {
                files.forEach(function (file) {
                    if (/.py/.test(file)) {
                        console.log(`---- Proceso hijo de ${file} Iniciado! ------`);
                        exec('cd datasource && python3 ' + file, function(error, stdout, stderr) {
                            console.log(`---- Proceso hijo de ${file} terminado! -----`);
                            if (stdout) {
                                console.log('stdout: ' + stdout);
                            }
    
                            if (stderr) {
                                console.log('stderr: ' + stderr);
                            }
    
                            if (error) {
                                console.log('exec error: ' + error);
                            }
                        });
                    }
                });
            }
        });
    }
}).start();

var harmonizerTask = new Scheduled({
    id: "harmonizerTask",
    pattern: "15 19 * * * *",
    task: function() {
        harmonizer(goblinDB);
    }
}).start();


goblinDB.on('change', function(){
    data = goblinDB.get("events");
});

harmonizerTask.launch();
pythonRocks.launch();
