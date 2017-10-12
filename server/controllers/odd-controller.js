var mongoose = require('mongoose');
var Odd = require('../datasets/odd');

module.exports.addOdd = function(req, res){
	var odd = new Odd(req.body);
	odd.save();
	res.json(odd)
}

module.exports.getList = function(req, res){
    Odd.find({$and : [{'userId' : req.body.id}, {deleted: 'false'}]}).exec(function (err, result) { 
        res.json(result);
    });
}

module.exports.deleteOdd = function(req, res){
    Odd.findByIdAndUpdate(req.body.id,{"$set": {"deleted": true }}).exec(function (err, result) { 
        res.json(result);
    });
}

module.exports.updateOdd = function(req, res){
    Odd.findByIdAndUpdate(req.body._id,req.body, {upsert:true}).exec(function (err, result) { 
        console.log(result)
        res.json(result);
    });
}