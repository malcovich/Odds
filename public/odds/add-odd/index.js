angular.module('MyApp').component('addOdd', {
    templateUrl: '/public/odds/add-odd/index.html',
    bindings: {
      user: '=',
      sports: '=' 
    },
    controller: function($rootScope, OddFactory){
        $ctrl = this;
        $ctrl.odd = {};

        $ctrl.$onInit = function() {

        };

        $ctrl.saveOdd = function() {
            $ctrl.odd.date = new Date();
            OddFactory.addOdd($ctrl.odd).then(function(){
                $rootScope.$broadcast("addedNewOdd",{});
                $ctrl.odd = {};
            });
        }

        $ctrl.setActive = function(type) {
            $ctrl.odd.type = type.value;
            $ctrl.odd.userId  = $ctrl.user._id;
            $ctrl.activeOption = type.title;
        }
    }
  });