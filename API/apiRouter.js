var express = require('express');

var routes = function() {
    var apiRouter = express.Router();

    apiRouter.route('/')
        .get(function(req, res){
            res.send("Welcome on api");
        });

    var userRoutes = require('./Users/userRoutes');
    apiRouter.use('/Users', userRoutes());


    return apiRouter;
};

module.exports = routes;
