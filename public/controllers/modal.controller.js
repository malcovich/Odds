angular.module('MyApp').controller('ModalInstanceCtrl',  function ($uibModalInstance) {
  var $ctrl = this;
  // $ctrl.contacts = contacts;
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});