angular.module('MyApp')
.controller('MatchesListController', ['$scope', '$state', 'user', 'OddFactory','$rootScope', '$http', function($scope, $state, user, OddFactory, $rootScope, $http){
    var $ctrl = this;
    $ctrl.user = user.data;
    
    // list.fixtures.forEach(function(item){
    //     // $http.post('/api/fixture/add',item).then(function(res){
    //     //     console.log(item)
    //     // })

    // });   

    var query = {'matchday' : 6}
    $http.post('/api/fixture/getList',query).then(function(res){
       $ctrl.list = res.data;
    })
    
}]);
