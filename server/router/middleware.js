const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const app        = express();

// Get our API routes
const api        = require('./config');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS 
app.use(function(req,res,next){
res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers','Authorization');
  res.header('Content-Type', 'multipart/form-data');
    next();
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/css', express.static(__dirname + '/node_modules/')); // redirect CSS bootstrap

 // Set our api routes
app.use('/api', api);                                                                                                                                 app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});                                                                                                                                                                                       




module.exports = app;