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
    var start =  parseFloat(req.body.matchday - 6);
    var end = parseFloat(req.body.matchday);
    console.log(start, end)
    Fixture.find({$and : [{'matchday':{$gt: start}}, {'matchday':{$lt : end}},{$or:[{'homeTeamName': {$in:req.body.names}}, {'awayTeamName': {$in:req.body.names}}]}]}).exec(function(err,list){
		res.json(list);
	})
}