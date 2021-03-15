controllers.controller('evalcompetencesController', function ($scope, $rootScope, $routeParams, questionsFactory, stageFactory, evalFactory, $location) {
  $scope.submitEval = function () {
    $scope.fields.datetime = new Date().toLocaleString('fr-FR')
    evalFactory.sendEvalCompetences($scope.stage.idstage, $scope.fields).then(success => {
      $location.path("/home")
      toastr.success("L'évaluation a bien été enregistrée")
    }, error => {
      console.log(error)
    })
  }

  $scope.initEval = function () {
    $scope.fields = {}
    $scope.fields.nomentreprise = $scope.stage.nomcomplet
    $scope.fields.nomtuteur = $rootScope.prenom + ' ' + $rootScope.nom
    $scope.fields.annee = $scope.stage.annee
    $scope.fields.niveau = $scope.stage.niveau
    $scope.fields.nom = $scope.stage.nom
    $scope.fields.prenom = $scope.stage.prenom
    $scope.fields.idtuteur = $scope.stage.idtuteur
    $scope.fields.idens = $scope.stage.idens
  }

  $scope.firstCategorie = function (item) {
    return item.idcompetence <= 7
  }

  $scope.secondCategorie = function (item) {
    return item.idcompetence <= 10 && item.idcompetence >= 8
  }

  $scope.thirdCategorie = function (item) {
    return item.idcompetence >= 11
  }

  stageFactory.getStageByIdForEval($routeParams.idstage)
    .then(success => {
      $scope.stage = success.data[0]
      if ($scope.stage == null)
        $location.path("/404")
      else
        $scope.initEval()
    }, error => {
      console.log(error)
    })

  questionsFactory.getAllCompetences()
    .then(function (success) {
      $scope.competences = success.data
      angular.forEach($scope.competences, function (row) {
        questionsFactory.getChoixByCompetenceId(row.idcompetence).then(success2 => {
          row.choix = success2.data
        }, error2 => {
          console.log(error2)
        })
      })
    }, function (error) {
      console.log(error)
    })

  $rootScope.checkConnexion()
})