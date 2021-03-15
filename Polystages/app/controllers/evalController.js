controllers.controller('evalController', function ($scope, $rootScope, $routeParams, questionsFactory, stageFactory, evalFactory, $location) {
  $scope.submitQuestionnaire = function () {
    $scope.fields.datetime = new Date().toLocaleString('fr-FR')
    evalFactory.sendEval($scope.stage.idstage, $scope.fields).then(success => {
      $location.path("/home")
      toastr.success("L'évaluation a bien été enregistrée")
    }, error => {
      console.log(error)
    })
  }

  $scope.initEval = function () {
    $scope.fields = {}
    $scope.fields[2] = $scope.stage.nom
    $scope.fields[3] = $scope.stage.prenom
    $scope.fields[4] = $scope.stage.nomcomplet
    $scope.fields[6] = $rootScope.prenom + ' ' + $rootScope.nom
    $scope.fields.annee = $scope.stage.annee
    $scope.fields.niveau = $scope.stage.niveau
    $scope.fields.nom = $scope.stage.nom
    $scope.fields.prenom = $scope.stage.prenom
    $scope.fields.idtuteur = $scope.stage.idtuteur
    $scope.fields.idens = $scope.stage.idens
  }

  questionsFactory.getQuestionsByCat(1)
    .then(function (success) {
      $scope.categorie1 = success.data
    }, function (error) {
      console.log(error)
    })

  questionsFactory.getQuestionsByCat(2)
    .then(function (success) {
      $scope.categorie2 = success.data
    }, function (error) {
      console.log(error)
    })

  questionsFactory.getQuestionsByCat(3)
    .then(function (success) {
      $scope.categorie3 = success.data
    }, function (error) {
      console.log(error)
    })

  questionsFactory.getQuestionsByCat(4)
    .then(function (success) {
      $scope.categorie4 = success.data
    }, function (error) {
      console.log(error)
    })

  questionsFactory.getQuestionsByCat(5)
    .then(function (success) {
      $scope.categorie5 = success.data
    }, function (error) {
      console.log(error)
    })

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

  $scope.choixOuiNon = ["Oui", "Non"]
  $scope.choixContrat = ["CDD", "CDI", "Prolongation de stage", "Contrat de thèse en entreprise", "VIE"]
  $scope.choixClassement = ["Parmi les meilleurs", "Au dessus de la moyenne", "À la moyenne", "En dessous de la moyenne", "Parmi les plus mauvais"]
  $scope.choixNotation = ["Très bien", "Bien", "Moyen", "Insuffisant", "Sans objet"]

  $rootScope.checkConnexion()
})