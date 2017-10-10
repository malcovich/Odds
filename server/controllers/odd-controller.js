var mongoose = require('mongoose');
var Odd = require('../datasets/odd');

module.exports.addOdd = function(req, res){
	var odd = new Odd(req.body);
	odd.save();
	res.json(odd)
}

module.exports.getList = function(req, res){
    Odd.find({}).exec(function (err, result) { 
        res.json(result);
    });
}