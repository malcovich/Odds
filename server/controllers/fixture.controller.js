var mongoose = require('mongoose');
var Fixture = require('../datasets/fixture');

module.exports.add = function(req, res){
	var fixture = new Fixture(req.body);
	fixture.save();
	res.json(req.body)
}

module.exports.getList = function(req, res){
    Fixture.find(req.body).exec(function(err,list){
		res.json(list);
	})
}
module.exports.getItem = function(req, res){
	Fixture.findById(req.body.id).exec(function(err,item){
		res.json(item);
	})
}

module.exports.getListPrevMatch = function(req, res){
    var start =  parseFloat(req.body.matchday - 15);
    var end = parseFloat(req.body.matchday);
    Fixture.find({$and : [{'matchday':{$gt: start}}, {'matchday':{$lt : end}},{$or: [{'homeTeamName': req.body.names[0]}, {'awayTeamName':req.body.names[1]}]}]}).exec(function(err,list){
		res.json(list);
	})
}