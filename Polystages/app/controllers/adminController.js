controllers.controller('adminController', function ($scope, $rootScope, retardsFactory, mailsFactory, stageFactory, userFactory, entreprisesFactory, $location, $timeout) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  $scope.getRetards = function () {
    $timeout(function () {
      retardsFactory.getRetardsTuteur().then(success1 => {
        $scope.retardsTuteurs = success1.data
        retardsFactory.getRetardsEleve().then(success2 => {
          $scope.retardsEleves = success2.data
          $('#btn-one').remove()
        }, error => {
          console.log(error)
        })
      }, error => {
        console.log(error)
      })
    }, 300);
  }

  $scope.sendMails = function () {
    data = {}
    data.retardsTuteurs = $scope.retardsTuteurs;
    data.retardsEleves = $scope.retardsEleves;
    mailsFactory.sendRappels(data).then(success => {
      toastr.success("Les mails ont bien été envoyés")
      retardsFactory.getRetardsTuteur().then(success1 => {
        $scope.retardsTuteurs = success1.data
        retardsFactory.getRetardsEleve().then(success2 => {
          $scope.retardsEleves = success2.data
          $('#btn-one').remove()
        }, error => {
          console.log(error)
        })
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
  }

  retardsFactory.updateRetards().then(success => {

  }, error => {
    console.log(error)
  })

  $('#btn-one').click(function () {
    $('#btn-one').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Chargement...').addClass('disabled');
  })

  $scope.checkIsAdmin()
  $rootScope.checkConnexion()
})