
var userController = function(userDb) {

    var get = function(req, res){
        var query = {};

        if(req.query.firstName || req.query.firstname) {
            query.firstName = req.query.firstName || req.query.firstname;
        }

        if(req.query.lastName || req.query.lastname) {
            query.lastName = req.query.lastName || req.query.lastname;
        }

        userDb.find(query, function(err, users) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.json(users);
            }
        });
    };

    var post = function(req, res){
        if(!req.body.firstName) {
            res.status(400);
            res.send('firstName is required');
        }
        else if(!req.body.lastName) {
            res.status(400);
            res.send('lastName is required');
        }
        else {
            save(req.body, req, res);
        }

    };

    var save = function(model, req, res) {

        var n = new userDb(model);

        n.save(function(err, user) {
            if(err) {
                res.status(500);
                res.send(err);
            } else {
                res.status(201);
                res.json(user);
            }
        });
    };

    var getById = function(req, res){
            res.json(req.user);
    };

    var update = function(req, res){

        req.user.firstName = req.body.firstName;
        req.user.lastName = req.body.lastName;

        save(req.user, req,res);
    };

    var patch = function(req, res){
        if(req.body._id)
            delete req.body._id;

        for(var p in req.body) {
            req.user[p] = req.body[p];
        }

        save(req.user, req,res);
    };

    var remove = function(req, res){
        userDb.remove({ _id: req.user._id }, function(err) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(true);
        });
    };

    return {
        get: get,
        getById: getById,
        post: post,
        update: update,
        patch: patch,
        delete: remove
    };
};

module.exports = userController;
