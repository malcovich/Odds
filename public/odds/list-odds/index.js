angular.module('MyApp').component('listOdds', {
    templateUrl: '/public/odds/list-odds/index.html',
    bindings: {
      odds: '=',
    },
    controller: function($http, $stateParams, FriendFactory){
      $ctrl = this;
  
      $ctrl.$onInit = function() {
          console.log("Odds", $ctrl.odds)
      };

      $ctrl.calculateResultOdd = function(odd){
          return odd.result*odd.rate*odd.value - odd.value;
      }
    }
  });