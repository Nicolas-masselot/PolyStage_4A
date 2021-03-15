controllers.controller('ajouterStageController', function ($scope,$rootScope, stageFactory,convertJsonFactory, entreprisesFactory, userFactory, enseignantsFactory, toolsFactory, $location) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  $scope.listStages
  // une grande partie doit se deplacer dans un nouveau controller rechercherStageController 
  let fileList;
  const fileSelector = document.getElementById('fileInput');
  fileSelector.addEventListener('change', (event) => {
     fileList = event.target.files;
  });
    
  
  $scope.loadStagesFromCsv = function () { 
    convertJsonFactory.convertStagesToJson(fileList[0].name).then(success => {
      $scope.listStages = success.data
      //console.log($scope.listStages)
      toolsFactory.notifySucess('Les stages sont récupérés avec succés ')
    }, error => {
        toolsFactory.notifyFailure('Les stages ne sont pas récupérés suite à un problème ')
    })
    
  }
    
// ici on récupère l'id de l'etudiant et l'id de l'entreprise pour l'ajouter dans l'objet stage ($scope.listStages)
  $scope.setStagesData = function () {
    
    // get id entreprise avec son nom
    $scope.listStages.forEach(element => {
      entreprisesFactory.getEntreprisesIdByName(element.Raisonsociale).then(success => {
        element.identreprise = success.data[0].identreprise
      });
    });

    // get id etudiant by nom et prénom
    $scope.listStages.forEach(element => {
      userFactory.getEleveIdByNomAndPrenom(element.Nomdeleleve, element.Prenomdeleleve).then(success => {
        element.ideleve = success.data[0].ideleve
      });
    });

    // get id enseignant by nom et prénom
    $scope.listStages.forEach(element => {
      let nomEnseignant = element.Nomenseignantencadrant
      let prenomEnseignant = element.Prenomenseignantencadrant
      enseignantsFactory.getEnseignantsIdByNomAndPrenom(nomEnseignant, prenomEnseignant).then(success => {
        console.log(success)
        element.idens = success.data[0].idens
      });
    });

    // get id tuteur by nom et prénom
    $scope.listStages.forEach(element => {
      let nomT = element.NomduTuteurdestagedanslentreprise
      let prenomT = element.PrenomduTuteurdestagedanslentreprise
      //$scope.getEntreprisesIdByName($scope.listStages)
      userFactory.getTuteurIdByNomAndPrenom(nomT, prenomT).then(success => {
        element.idtuteur = success.data[0].idtuteur
      });
    });

  }

  $scope.saveStages = function () {
    $scope.listStages.forEach(element => {
      stageFactory.createStageWithCsv(element).then(success => {
        toolsFactory.notifySucess('Les stages sont enregistrés avec succés')
        $('#saveModal').modal('hide')
      }, error => {
        toolsFactory.notifyFailure('Erreur, Les données du stage(s) ne sont pas enregistrées')
      })
    })
  }

  $scope.getEntreprisesIdByName = function (stages) {
    stages.forEach(element => {
      entreprisesFactory.getEntreprisesIdByName(element.Raisonsociale).then(success => {
        element.identreprise = success.data[0].identreprise
      });
    })
    return stages;
  } 

  $scope.getEleveIdByNomAndPrenom = function (element) {
    userFactory.getEleveIdByNomAndPrenom(element.Nomdeleleve, element.Prenomdeleleve).then(success => {
      element.ideleve = success.data[0].ideleve
    });
    return element;
  } 

  $scope.cancelSave = function () {
    location.reload()
  }  

  // le stage à modifier
  $scope.currentItem = {}
  $scope.init = function (item) {
    let Sujetdustage = document.getElementById("Sujetdustage")
    Sujetdustage.value = item.Sujetdustage 
    let Raisonsociale = document.getElementById("Raisonsociale")
    Raisonsociale.value = item.Raisonsociale;
    let VilledeStage = document.getElementById("VilledeStage")
    VilledeStage.value = item.VilledeStage;
    let PaysdeStage = document.getElementById("PaysdeStage")
    PaysdeStage.value = item.PaysdeStage;
    let Datededebut = document.getElementById("Datededebut")
    Datededebut.value = item.Datededebut;
    let Datedefin = document.getElementById("Datedefin")
    Datedefin.value = item.Datedefin;

    let Nomdeleleve = document.getElementById("NomEtudiant")
    Nomdeleleve.value = item.Nomdeleleve;

    let Prenomdeleleve = document.getElementById("PrenomEtudiant")
    Prenomdeleleve.value = item.Prenomdeleleve;

    let NomduTuteurdestagedanslentreprise = document.getElementById("NomduTuteurDesStagesDansLentreprise")
    NomduTuteurdestagedanslentreprise.value = item.NomduTuteurdestagedanslentreprise;

    let PrenomduTuteurdestagedanslentreprise = document.getElementById("PrenomduTuteurDesStagesDansLentreprise")
    PrenomduTuteurdestagedanslentreprise.value = item.PrenomduTuteurdestagedanslentreprise;

    let MailTuteurDesStageDansLentreprise = document.getElementById("MailTuteurDesStageDansLentreprise")
    MailTuteurDesStageDansLentreprise.value = item.MailTuteurdestagedanslentreprise;

    let Adressedustage = document.getElementById("Adressedustage")
    Adressedustage.value = item.Adressedustage;

    let Prenomenseignantencadrant = document.getElementById("Prenomenseignantencadrant")
    Prenomenseignantencadrant.value = item.Prenomenseignantencadrant;

    let Nomenseignantencadrant = document.getElementById("Nomenseignantencadrant")
    Nomenseignantencadrant.value = item.Nomenseignantencadrant;

    // le stage à modifier
    currentItem = item
    //console.log(currentItem)
  }

  $scope.SaveModifications = function () {
    let Sujetdustage = document.getElementById("Sujetdustage").value
    let Raisonsociale = document.getElementById("Raisonsociale").value
    let VilledeStage = document.getElementById("VilledeStage").value
    let PaysdeStage = document.getElementById("PaysdeStage").value
    let Datededebut = document.getElementById("Datededebut").value
    let Datedefin = document.getElementById("Datedefin").value
    let Prenomdeleleve = document.getElementById("PrenomEtudiant").value
    let Nomdeleleve = document.getElementById("NomEtudiant").value
    let NomduTuteurdestagedanslentreprise = document.getElementById("NomduTuteurDesStagesDansLentreprise").value
    let PrenomduTuteurdestagedanslentreprise = document.getElementById("PrenomduTuteurDesStagesDansLentreprise").value
    let MailTuteurDesStageDansLentreprise = document.getElementById("MailTuteurDesStageDansLentreprise").value
    let Adressedustage = document.getElementById("Adressedustage").value
    let Prenomenseignantencadrant = document.getElementById("Prenomenseignantencadrant").value
    let Nomenseignantencadrant = document.getElementById("Nomenseignantencadrant").value

    let newItem = currentItem;
    // mettre a jour le stage avec les nouvelles informations
    newItem.Sujetdustage = Sujetdustage
    newItem.Raisonsociale = Raisonsociale
    newItem.VilledeStage = VilledeStage
    newItem.PaysdeStage = PaysdeStage
    newItem.Datededebut = Datededebut
    newItem.Datedefin = Datedefin
    newItem.MailTuteurdestagedanslentreprise = MailTuteurDesStageDansLentreprise
    newItem.NomduTuteurdestagedanslentreprise = NomduTuteurdestagedanslentreprise
    newItem.PrenomduTuteurdestagedanslentreprise = PrenomduTuteurdestagedanslentreprise
    newItem.Prenomenseignantencadrant = Prenomenseignantencadrant
    newItem.Nomenseignantencadrant = Nomenseignantencadrant
    newItem.Prenomdeleleve = Prenomdeleleve
    newItem.Nomdeleleve = Nomdeleleve
    newItem.Adressedustage = Adressedustage

    console.log(newItem)
    let indexItem = $scope.listStages.indexOf(currentItem);
    $scope.listStages[indexItem] = newItem

    toolsFactory.notifySucess('Données du stage modifiées avec succés')
    $('#modifyModal').modal('hide')
  }

  $scope.checkIsAdmin()
})
