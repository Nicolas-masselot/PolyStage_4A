var simpleApp = angular.module('SimpleApp', ["ngRoute", "Controllers", "hmTouchEvents", "angularMoment", "ngFileUpload"])

var controllers = angular.module('Controllers', [])

simpleApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/views/login.html',
        controller: 'loginController'
      }).
      when('/register', {
        templateUrl: 'app/views/register.html',
        controller: 'registerController'
      }).
      when('/home', {
        templateUrl: 'app/views/home.html',
        controller: 'homeController'
      }).
      when('/admin', {
        templateUrl: 'app/views/admin.html',
        controller: 'adminController'
      }).
      when('/rechercherStage', {
        templateUrl: 'app/views/rechercherStage.html',
        controller: 'rechercherStageController'
      }).
      when('/detailsDuStage', {
        templateUrl: 'app/views/detailsDuStage.html',
        controller: 'rechercherStageController'
      }).
      when('/ajouterStage', {
        templateUrl: 'app/views/ajouterStage.html',
        controller: 'ajouterStageController'
      }).
      when('/evaluation/stage/:idstage', {
        templateUrl: 'app/views/eval.html',
        controller: 'evalController'
      }).
      when('/evaluationcompetences/stage/:idstage', {
        templateUrl: 'app/views/evalcompetences.html',
        controller: 'evalcompetencesController'
      }).
      when('/formulaire', {
        templateUrl: 'app/views/form.html',
        controller: 'formController'
      }).
      when('/modifier/stage/:idstage', {
        templateUrl: 'app/views/modifierstage.html',
        controller: 'modifierStageController'
      }).
      when('/404', {
        templateUrl: 'app/views/404.html',
        controller: '404Controller'
      }).
      when('/statistique', {
        templateUrl: 'app/views/statistique.html',
        controller: 'statistiqueController'
      }).
      otherwise({
        redirectTo: '/404'
      })
  }])

simpleApp.run(function (amMoment) {
  amMoment.changeLocale('fr');
});