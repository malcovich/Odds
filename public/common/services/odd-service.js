angular.module('MyApp').factory('OddFactory', function($http) {
	var service = {};
	

	service.addOdd = function(obj){
		return $http.post('/api/odds/add', obj);
	}

	service.getList = function(obj){
		return $http.post('/api/odds/getList', obj);
	}
	
	return service;
}) 