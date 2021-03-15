controllers.controller('statistiqueController', function ($scope,$rootScope, stageFactory, userFactory, entreprisesFactory, statistiqueFactory, $location) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  // recuperer le nom de l entreprise avec son id 
    $scope.getNomEntreprise = function (stages) {
      stages.forEach(element => {
        entreprisesFactory.getEntreprisesNameById(element.identreprise)
          .then(function (success) {
            element.nomentreprise = success.data[0].nomcomplet
          })
      });
      return stages
    }

  // recuperer tous les stages
    $scope.getAllStages = function () {
      stageFactory.getAllStages()
        .then(function (success) {
          $scope.stages = success.data
          $scope.getNomEntreprise($scope.stages)
        }, function (error) {
          //$scope.erreurAuthentification()
        })
    }
    $scope.getAllStages()

  // recuperer les stages par annee
    $scope.allStagesInfosByAnnee = function () {
        stageFactory.getStageByAnnee()
        .then(function (success) {
            $scope.annee = success.data
            statistiqueFactory.getGrapheYear($scope.annee)
        })
    }
    $scope.allStagesInfosByAnnee()

  // recuperer les stages effectués par niveau
    $scope.allStagesInfosByLevel = function () {
      stageFactory.getStageByLevel()
      .then(function (success) {
          $scope.niveau = success.data
          statistiqueFactory.getGrapheLevel($scope.niveau)
      })
    }
    $scope.allStagesInfosByLevel()

  // recuperer le nombre de stages effectués par ville
    $scope.allStagesInfosByCity = function () {
      stageFactory.getStageByCity()
      .then(function (success) {
          $scope.ville = success.data
          statistiqueFactory.getGrapheCity($scope.ville)
      })
    }
    $scope.allStagesInfosByCity()


  $scope.checkIsAdmin()
})