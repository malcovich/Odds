angular.module('MyApp').component('listOdds', {
    templateUrl: '/public/odds/list-odds/index.html',
    bindings: {
      odds: '=',
    },
    controller: function($http, $stateParams, OddFactory, $rootScope, ModalFactory ){
        $ctrl = this;

        $ctrl.$onInit = function() {
            console.log("Odds", $ctrl.odds)
        };

        $ctrl.calculateResultOdd = function(odd){
            return odd.result*odd.rate*odd.value - odd.value;
        }

        $ctrl.deleteOdd = function(odd){
            OddFactory.deleteOdd({'id': odd._id}).then(function(){
                $rootScope.$broadcast("addedNewOdd",{});
            });
        }
         function updateOdd(odd){
            OddFactory.updateOdd(odd).then(function(){
                $rootScope.$broadcast("addedNewOdd",{});
            })
        }
        $ctrl.openEditModal = function(odd){
            ModalFactory.openEditOddModal('editOdd.html', 'editOdd', odd,  updateOdd).then(function(ctrl){
            }, function () {
                console.info('Modal dismissed at: ' + new Date());
            });
        }
       
    }
  });

angular.module('MyApp').controller('editOdd', function ($uibModalInstance, $state, odd , updateOdd) {
    var $ctrl = this;
    $ctrl.odd = angular.copy(odd);
    $ctrl.updateOdd = updateOdd;
    $ctrl.sports =  [
        {
            'title' : 'football',
            'value' : 1
        }
    ]

    $ctrl.ok = function () {
        $ctrl.updateOdd($ctrl.odd);
      $uibModalInstance.close($ctrl);
    };
  
    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
});