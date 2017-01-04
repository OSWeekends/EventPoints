var exec = require('child_process').exec,
    fs = require('fs'),
    project = require('pillars'),
    firebase = require('firebase'),
    config = require('./config'),
    harmonizer = require("./harmonizer.js");

// Bring data from datasources
var data = harmonizer();

// Firebase setup
firebase.initializeApp({
  serviceAccount: {
    projectId: config.firebase.project_id,
    clientEmail: config.firebase.client_email,
    privateKey: config.firebase.private_key
  },
  databaseURL: "https://"+config.firebase.project_id+".firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("events");

// Starting the project
project.services.get('http').configure({
    port: process.env.PORT || 3000
}).start();

// Define Rutes
var apiRoute = new Route({
    id: 'staticRoute',
    path: '/api',
    cors: true
    }, function(gw){
        gw.redirect("/");
});

var apiEventsRoute = new Route({
    id: 'staticRoute',
    path: 'api/events',
    cors: true
    }, function(gw){
        gw.json(data, {deep:10});
});

var staticRoute = new Route({
    id: 'staticRoute',
    path: '/*:path',
    directory: {
        path: './public',
        listing: true
    }
});

// Adding routes objects to the project
project.routes.add(apiEventsRoute);
project.routes.add(apiRoute);
project.routes.add(staticRoute);




function readData() {
    ref.once("value", function(snapshot) {
        data = snapshot.val();
    }, function (errorObject) {
        console.log("Error:", errorObject);
    });
}

function updateData(){
    ref.set(data, function(error) {
      if (error) {
        console.log("Data could not be saved." + error);
      } else {
        console.log("Data saved successfully.");
      }
    });
}

function pythonRocks () {
    fs.readdir('./datasource/', (err, files) => {
      files.forEach(file => {
          if(/.py/.test(file)){
            console.log(`---- Proceso hijo de ${file} Iniciado! ------`);
            exec('cd datasource && python3 '+ file, function(error, stdout, stderr) {
                console.log(`---- Proceso hijo de ${file} terminado! -----`);
                
                if(stdout){
                    console.log('stdout: ' + stdout);
                }
                
                if(stderr){
                    console.log('stderr: ' + stderr);
                }
                
                if (error) {
                    console.log('exec error: ' + error);
                }
            });
          }
      });
    });
};

//updateData();
//readData();

// Cron Tasks

