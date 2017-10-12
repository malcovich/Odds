angular.module('MyApp')
.controller('OddsListController', ['$scope', '$state', 'user', 'OddFactory','$rootScope', function($scope, $state, user, OddFactory, $rootScope){
    var $ctrl = this;
    $ctrl.user = user.data;
    
    $ctrl.sports =  [
        {
            'title' : 'football',
            'value' : 1
        }
    ]

    if (!$ctrl.user){
        $state.go('landing');
    }else {
        getListOdds();

        $rootScope.$on("addedNewOdd",function() {
            getListOdds();
        });
    }

    function calculateTotalProfit () {
        $ctrl.odds.forEach(function(odd){
            $ctrl.totalProfit = $ctrl.totalProfit + odd.result*odd.rate*odd.value - odd.value;
        })
    }

    function calculateWinBets () {
        $ctrl.winBets = $ctrl.odds.filter(function(odd){return odd.result > 0 }).length;
    }

    function calculateAvarageRange () {
        var totalRate = 0;
        $ctrl.odds.forEach(function(odd){
            totalRate += odd.rate;
        });
        $ctrl.avarageRate = (totalRate/$ctrl.odds.length).toFixed(2);
    }

    function getListOdds (){
        $ctrl.totalProfit = 0;
        $ctrl.winBets = 0;
        $ctrl.avarageRate = 0;
        OddFactory.getList({'id': $ctrl.user._id}).then(function(res){
            $ctrl.odds = res.data;
            calculateTotalProfit();
            calculateWinBets();
            calculateAvarageRange();
        });
    }

}]);
