controllers.controller('loginController', function ($scope, $rootScope, userFactory, $window, $location) {
  $scope.checkConnexion = function () {
    if ($rootScope.isConnected)
      $location.path("/home")
  }

  $scope.connexion = function (identifiant, password) {
    userFactory.connexion(identifiant, password)
      .then(function (success) {
        $rootScope.prenom = success.data[0].prenom
        $rootScope.nom = success.data[0].nom
        $rootScope.role = success.data[0].role
        $rootScope.numEtudiant = success.data[0].numetudiant
        $rootScope.email = success.data[0].email
        $rootScope.idEleve = success.data[0].ideleve
        $rootScope.idTuteur = success.data[0].idtuteur
        $rootScope.idEns = success.data[0].idens
        $rootScope.niveau = success.data[0].niveau
        $rootScope.annee = success.data[0].annee
        $rootScope.admin = success.data[0].admin
        $rootScope.isConnected = true
        $window.sessionStorage.setItem('isConnected', $rootScope.isConnected)
        $window.sessionStorage.setItem('prenom', $rootScope.prenom)
        $window.sessionStorage.setItem('nom', $rootScope.nom)
        $window.sessionStorage.setItem('role', $rootScope.role)
        $window.sessionStorage.setItem('numEtudiant', $rootScope.numEtudiant)
        $window.sessionStorage.setItem('email', $rootScope.email)
        $window.sessionStorage.setItem('idEleve', $rootScope.idEleve)
        $window.sessionStorage.setItem('idTuteur', $rootScope.idTuteur)
        $window.sessionStorage.setItem('idEns', $rootScope.idEns)
        $window.sessionStorage.setItem('niveau', $rootScope.niveau)
        $window.sessionStorage.setItem('annee', $rootScope.annee)
        $window.sessionStorage.setItem('admin', $rootScope.admin)
        $location.path("/home")
      }, function (error) {
        $scope.erreurAuthentification()
      })
  }

  $scope.erreurAuthentification = function () {
    toastr.error('Mauvais identifiant / mot de passe')
    $scope.identifiant = null
    $scope.password = null
    $scope.login.$setPristine()
  }

  $scope.checkConnexion()
})
