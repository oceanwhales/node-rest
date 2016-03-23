// var MongoClient = require('mongodb').MongoClient;

var Promise = require('bluebird');
// var mongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;

var MongoDB = Promise.promisifyAll(require("mongodb"));
var mongoClient = Promise.promisifyAll(MongoDB.MongoClient);

function getStudents(req, res) {
    
    // var dbport = "56332"; 
    var url = 'mongodb://' + process.env.IP + ':27017/test';
    mongoClient.connectAsync(url)
        .then(function(db) {
            console.log("Connected correctly to mongodb server.");
            return [db.collection("students").find({}).toArrayAsync(), db];
        })
        .spread(function(students, db){       
            res.send(students);
            return db.closeAsync();
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).send('Db connection error');
        });
}

function addStudent(req, res) {

    if (!req || !req.body){
        return;
    }
    
    var newStudent = {
        firstname : req.body.firstname,
        name: req.body.name
    };
    
    // var dbport = "56332"; 
    var url = 'mongodb://' + process.env.IP + ':27017/test';
    mongoClient.connectAsync(url)
        .then(function(db) {
            console.log("Connected correctly to mongodb server.");
            return [db.collection("students").insertAsync(newStudent), db];
        })
        .spread(function(oppResult, db){
            return db.closeAsync();
        })
        .then(function(){
            res.status(200).send("OK");
            
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).send('Db error');
        });
}


module.exports = {
    getStudents : getStudents,
    addStudent : addStudent
};