var express = require('express');
var mongoose = require('mongoose');

var routes = function() {

    var db = mongoose.connect(process.env.ConnectionString);
    var userRouter = express.Router();
    var userDb = require('./userModel');
    var userController = require('./userController')(userDb);

    userRouter.route('/')
        .get(userController.get)
        .post(userController.post);

    userRouter.use('/:userId', function(req, res, next){
        userDb.findById(req.params.userId, function(err, user){
            if(err) {
                res.status(500).send(null);
            } else if (user) {
                req.user = user;
                next();
            } else {
                res.status(404).send('user ' + req.params.userId + ' not found.')
            }
        });
    });

    userRouter.route('/:userId')
        .get(userController.getById)
        .put(userController.update)
        .patch(userController.patch)
        .delete(userController.delete);

    return userRouter;

};

module.exports = routes;
