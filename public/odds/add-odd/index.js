angular.module('MyApp').component('addOdd', {
    templateUrl: '/public/odds/add-odd/index.html',
    bindings: {
      odds: '=',
    },
    controller: function($rootScope, OddFactory){
        $ctrl = this;

        $ctrl.$onInit = function() {

        };

        $ctrl.saveOdd = function() {
            $ctrl.odd.date = new Date();
            OddFactory.addOdd($ctrl.odd);
            $rootScope.$broadcast("addedNewOdd",{});
            $ctrl.odd = {};
        }
    }
  });