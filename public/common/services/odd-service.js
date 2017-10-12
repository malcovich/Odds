angular.module('MyApp').factory('OddFactory', function($http) {
	var service = {};
	

	service.addOdd = function(obj){
		return $http.post('/api/odds/add', obj);
	}

	service.getList = function(obj){
		return $http.post('/api/odds/getList', obj);
	}

	service.deleteOdd = function (obj) {
		return $http.post('/api/odds/deleteOdd', obj);
	}

	service.updateOdd = function(obj){
		return $http.post('/api/odds/updateOdd', obj);
	}
	
	return service;
}) 