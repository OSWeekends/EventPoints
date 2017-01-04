var project = require('pillars'),
    config = require('./config');

// Starting the project
project.services.get('http').configure({
    port: process.env.PORT || 3000
}).start();

// Static
var staticRoute = new Route({
    id: 'staticRoute',
    path: '/*:path',
    directory: {
        path: './public',
        listing: true
    }
});

// Adding routes objects to the project
project.routes.add(staticRoute);