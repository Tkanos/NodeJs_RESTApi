var express = require('express'),
    bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5000;

/* USE */

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* ROUTING */

var apiRouter = require('./Api/apiRouter.js');
app.use('/api', apiRouter());


app.get('/', function(req, res) {
  res.send('Welcome on board');  
});

app.listen(port, function() {
    console.log('Running on port : ' + port);
});

module.exports = app;
