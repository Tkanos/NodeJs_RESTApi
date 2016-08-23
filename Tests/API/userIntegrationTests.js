var should = require('should'),
    request = require('supertest'),
    app = require('../../app.js'),
    mongoose = require('mongoose'),
    userDb = mongoose.model('User'),
    agent = request.agent(app);


describe('User CRUD Test', function(){
    it('should allow a user to be posted and return and _id', function(done){
        var userPost = {firstName:'firstName', lastName:'lastName'};
        agent.post('/api/users')
            .send(userPost)
            .expect(200)
            .end(function(err, results){
                results.body.should.have.property('_id')
                done();
        });
    });

    afterEach(function(done) {
        userDb.remove().exec();
        done();
    });
});
