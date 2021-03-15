controllers.controller('mainController', function ($scope, $rootScope, $timeout, $window, $location) {
    $scope.initApp = function () {
        $(".button-collapse").sideNav()
        $rootScope.getSessionInfos()
    }

    $rootScope.checkConnexion = function () {
        if (!$rootScope.isConnected)
            $location.path("/")
    }

    $rootScope.getSessionInfos = function () {
        $rootScope.isConnected = $window.sessionStorage.getItem('isConnected')
        $rootScope.prenom = $window.sessionStorage.getItem('prenom')
        $rootScope.nom = $window.sessionStorage.getItem('nom')
        $rootScope.role = $window.sessionStorage.getItem('role')
        $rootScope.numEtudiant = $window.sessionStorage.getItem('numEtudiant')
        $rootScope.email = $window.sessionStorage.getItem('email')
        $rootScope.idEleve = $window.sessionStorage.getItem('idEleve')
        $rootScope.idTuteur = $window.sessionStorage.getItem('idTuteur')
        $rootScope.idEns = $window.sessionStorage.getItem('idEns')
        $rootScope.niveau = $window.sessionStorage.getItem('niveau')
        $rootScope.annee = $window.sessionStorage.getItem('annee')
        $rootScope.admin = $window.sessionStorage.getItem('admin')
    }

    $rootScope.$watch('isConnected', function () {
        $rootScope.getSessionInfos()
    })

    $rootScope.deconnexion = function () {
        $window.sessionStorage.removeItem('isConnected')
        $window.sessionStorage.removeItem('prenom')
        $window.sessionStorage.removeItem('nom')
        $window.sessionStorage.removeItem('role')
        $window.sessionStorage.removeItem('numEtudiant')
        $window.sessionStorage.removeItem('email')
        $window.sessionStorage.removeItem('idEleve')
        $window.sessionStorage.removeItem('idTuteur')
        $window.sessionStorage.removeItem('idEns')
        $window.sessionStorage.removeItem('niveau')
        $window.sessionStorage.removeItem('annee')
        $window.sessionStorage.removeItem('admin')

        $rootScope.getSessionInfos()
        $location.path("/")
    }

    angular.element(document).ready(function () {
        $('.preloader').addClass('animated fadeOut')
        $timeout(function () {
            $('.preloader').remove()
        }, 1000)
    })
    $scope.initApp()
})