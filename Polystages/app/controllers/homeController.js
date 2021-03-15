controllers.controller('homeController', function ($scope, $rootScope, stageFactory, mailsFactory, $location, Upload) {
  $scope.ajouterUnStage = function () {
    $location.path("/formulaire")
  }

  $scope.uploadRapport = function (file, annee, niveau, nom, prenom, idstage, mail) {
    if (file.size > 5000000) {
      toastr.error("Le fichier est trop grand (>5MO)")
      $scope.isRapportUploaded = false
    }
    else {
      file.upload = Upload.upload({
        url: 'http://localhost:8080/upload',
        data: { file: file },
        params: { type: 'rapport', annee: annee, niveau: niveau, nom: nom, prenom: prenom, idstage: idstage, mail: mail }
      })

      file.upload.then(function (response) {
        toastr.success('Le rapport a bien été téléchargé')
        $scope.isRapportUploaded = true
        stageFactory.getEleveStages($rootScope.idEleve).then(success => {
          $scope.stages = success.data
        }, error => {
          console.log(error)
        })
      }, function (response) {
        toastr.error("Le rapport n'a pas pu être téléchargé")
        $scope.isRapportUploaded = false
      })
    }
  }

  $scope.uploadPres = function (file, annee, niveau, nom, prenom, idstage, mail) {
    if (file.size > 10000000) {
      toastr.error("Le fichier est trop grand (>10MO)")
      $scope.isPresUploaded = false
    }
    else {
      file.upload = Upload.upload({
        url: 'http://localhost:8080/upload',
        data: { file: file },
        params: { type: 'presentation', annee: annee, niveau: niveau, nom: nom, prenom: prenom, idstage: idstage, mail: mail }
      })

      file.upload.then(function (response) {
        toastr.success('La présentation a bien été téléchargée')
        $scope.isPresUploaded = true
        stageFactory.getEleveStages($rootScope.idEleve).then(success => {
          $scope.stages = success.data
        }, error => {
          console.log(error)
        })
      }, function (response) {
        toastr.error("La présenation n'a pas pu être téléchargée")
        $scope.isPresUploaded = false
      })
    }
  }

  $scope.random = function () {
    return Math.floor(Math.random() * Math.floor(11));
  }

  $scope.lancerEvaluation = function (idstage, idtuteur, nom, prenom) {
    const datetime = new Date().toLocaleString('fr-FR')
    data = { idstage, idtuteur, nom, prenom, datetime }
    mailsFactory.sendEvalAlert(data).then(success => {
      toastr.success("L'évaluation a bien été lancée")
      stageFactory.getEnsStages($rootScope.idEns).then(success => {
        $scope.stages = success.data
      }, error => {
        console.log(error)
      })
    }, error => {
      toastr.error('Une erreur est survenue')
    })
  }

  $scope.lancerAllEvaluation = function () {

    let idstage
    let nom
    let prenom
    let idtuteur

    $scope.stages.forEach(stage => {
      if(!stage.evallancee){
        idstage = stage.idstage
        idtuteur = stage.idtuteur
        nom = stage.nom
        prenom = stage.prenom
        const datetime = new Date().toLocaleString('fr-FR')
        data = { idstage, idtuteur, nom, prenom, datetime }
        mailsFactory.sendEvalAlert(data).then(success => {
          toastr.success("L'évaluation a bien été lancée")
          stageFactory.getEnsStages($rootScope.idEns).then(success => {
            $scope.stages = success.data
            isAllEvaluated();
          }, error => {
            console.log(error)
          })
        }, error => {
          toastr.error('Une erreur est survenue')
        })
      }  
    }); 
  }

  isAllEvaluated = function() {
    $scope.isAllEvaluated = true;
    $scope.stages.forEach(stage => {
      console.log(stage)
      if(stage.evallancee == null){
        $scope.isAllEvaluated = false
        return
      }
    })
  }

  $scope.evaluer = function (idstage) {
    $location.path("/evaluation/stage/" + idstage)
  }

  $scope.evaluerCompetences = function (idstage) {
    $location.path("/evaluationcompetences/stage/" + idstage)
  }

  if ($rootScope.role == 'eleve') {
    stageFactory.getEleveStages($rootScope.idEleve).then(success => {
      $scope.stages = success.data
    }, error => {
      console.log(error)
    })

    stageFactory.getCurrentStageEleve($rootScope.annee, $rootScope.idEleve).then(success => {
      $scope.currentStage = success.data
    }, error => {
      console.log(error)
    })
  }

  if ($rootScope.role == 'tuteur') {
    stageFactory.getTuteurStages($rootScope.idTuteur).then(success => {
      $scope.stages = success.data
    }, error => {
      console.log(error)
    })

    stageFactory.getCurrentStageTuteur($rootScope.annee, $rootScope.idTuteur).then(success => {
      $scope.currentStage = success.data
    }, error => {
      console.log(error)
    })
  }

  if ($rootScope.role == 'enseignant') {
    stageFactory.getEnsStages($rootScope.idEns).then(success => {
      $scope.stages = success.data
    }, error => {
      console.log(error)
    })

    stageFactory.getCurrentStageEns($rootScope.annee, $rootScope.idEns).then(success => {
      $scope.currentStage = success.data
    }, error => {
      console.log(error)
    })
  }

  $rootScope.checkConnexion()
})