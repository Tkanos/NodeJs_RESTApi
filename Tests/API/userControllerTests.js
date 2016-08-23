var should = require('should'),
    sinon = require('sinon');

describe('api/userController Tests', function(){
    describe('Post', function(){
        it('Should not allow empty firstName', function(){

            //Arrange
            var userDb = function(user){this.save = function(callback){}};

            var req = {
                body: {
                    lastName: 'lastname'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            //Act
            var userController = require('../../API/Users/userController')(userDb);
            userController.post(req, res);

            //Assert
            res.status.args.length.should.equal(1);
            res.status.calledWith(400).should.equal(true, 'Bas Status : ' + res.status.args[0][0]);
            res.send.calledWith('firstName is required').should.equal(true);
        });

        it('Should not allow empty lastName', function(){

            //Arrange
            var userDb = function(user){this.save = function(callback){}};

            var req = {
                body: {
                    firstName: 'firstName'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            //Act
            var userController = require('../../API/Users/userController')(userDb);
            userController.post(req, res);

            //Assert
            res.status.args.length.should.equal(1);
            res.status.calledWith(400).should.equal(true, 'Bas Status : ' + res.status.args[0][0]);
            res.send.calledWith('lastName is required').should.equal(true);
        });
    });

    describe('GET', function(){
        it('Should call mongoDb', function(){
            //Arrange
            var userDb = {
                find : sinon.spy()
            }

            var req = {
                query: {
                }
            };

            var res = {
                status: {},
                send: {}
            };

            //Act
            var userController = require('../../API/Users/userController')(userDb);
            userController.get(req, res);

            //Assert
            userDb.find.args.length.should.equal(1);

        });

         it('Should allow filtering by firstname', function(){
            //Arrange
            var userDb = {
                find : sinon.spy()
            }

            var req = {
                query: {
                    firstname: 'firstname'
                }
            };

            var res = {
                status: {},
                send: {}
            };

            //Act
            var userController = require('../../API/Users/userController')(userDb);
            userController.get(req, res);

            //Assert
            userDb.find.args.length.should.equal(1);
            userDb.find.args[0][0].firstName.should.equal('firstname', 'Bad Filetring : ' + userDb.find.args[0][0].firstName);

        });

        it('Should allow filtering by firstName', function(){
            //Arrange
            var userDb = {
                find : sinon.spy()
            }

            var req = {
                query: {
                    firstName: 'firstname'
                }
            };

            var res = {
                status: {},
                send: {}
            };

            //Act
            var userController = require('../../API/Users/userController')(userDb);
            userController.get(req, res);

            //Assert
            userDb.find.args.length.should.equal(1);
            userDb.find.args[0][0].firstName.should.equal('firstname', 'Bad Filetring : ' + userDb.find.args[0][0].firstName);

        });

        it('Should allow filtering by lastname', function(){
            //Arrange
            var userDb = {
                find : sinon.spy()
            }

            var req = {
                query: {
                    lastname: 'lastname'
                }
            };

            var res = {
                status: {},
                send: {}
            };

            //Act
            var userController = require('../../API/Users/userController')(userDb);
            userController.get(req, res);

            //Assert
            userDb.find.args.length.should.equal(1);
            userDb.find.args[0][0].lastName.should.equal('lastname', 'Bad Filetring : ' + userDb.find.args[0][0].lastName);

        });

        it('Should allow filtering by lastName', function(){
            //Arrange
            var userDb = {
                find : sinon.spy()
            }

            var req = {
                query: {
                    lastName: 'lastname'
                }
            };

            var res = {
                status: {},
                send: {}
            };

            //Act
            var userController = require('../../API/Users/userController')(userDb);
            userController.get(req, res);

            //Assert
            userDb.find.args.length.should.equal(1);
            userDb.find.args[0][0].lastName.should.equal('lastname', 'Bad Filetring : ' + userDb.find.args[0][0].lastName);

        });
    });


});
