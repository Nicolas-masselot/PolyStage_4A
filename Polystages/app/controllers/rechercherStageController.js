controllers.controller(
  "rechercherStageController",
  function (
    $scope,
    $rootScope,
    stageFactory,
    userFactory,
    convertJsonFactory,
    entreprisesFactory,
    toolsFactory,
    $location
  ) {
    $scope.checkIsAdmin = function () {
      if ($rootScope.admin != 1) $location.path("/404");
    };

    let state = {
      querySet: "",
      page: 1,
      rows: 10,
      window: 10,
    };
    let DeleteStageItem;

    $scope.stageItem;

    $scope.setSearchValue = function () {
      $scope.val = document.getElementById("searchBar").value;
      //console.log($scope.val)
    };

    // recuperer tous les stages
    $scope.getAllStages = function () {
      stageFactory.getAllStages().then(
        function (success) {
          $scope.stages = success.data;
          $scope.getNomEntreprise($scope.stages);
          toolsFactory.setPagination($scope.stages, $scope.initModify, $scope.initDeleteStage);
        },
        function (error) {
          //$scope.erreurAuthentification()
        }
      );
    };

    $scope.getAllStages();

    // recuperer les stages avec la valeur dans search bar
    $scope.allStagesBySearchValue = function (searchValue) {
      $scope.val = document.getElementById("searchBar").value;
      if (!searchValue) $scope.getAllStages();
      stageFactory.getStagesByVal(searchValue).then(
        function (success) {
          $scope.stages = success.data;
          $scope.getNomEntreprise($scope.stages);
          toolsFactory.setPagination($scope.stages,$scope.initModify, $scope.initDeleteStage);
        },
        function (error) {
          //$scope.erreurAuthentification()
        }
      );
    };

    // fonction pour la conversion du stage ( json to csv )
    $scope.oneStageJsonToCsv = function (data) {
      console.log(data)
      convertJsonFactory.convertOneStageJsonToCsv(data).then(
        (success) => {
          toolsFactory.notifySucess("Fichier téléchargé avec succés");
          window.open("http://localhost:8080/downloadFileStagesCSV", "_blank");
        },
        (error) => {
          toolsFactory.notifyFailure(
            "Une erreur s'est produite, le fichier n'est pas téléchrgé"
          );
        }
      );
    };

    $scope.allStagesJsonToCsv = function (data) {
      //console.log(data)
      let allStageId = getAllStagesId(data);
      //console.log(allStageId)
      convertJsonFactory.convertAllStagesJsonToCsv(allStageId).then(
        (success) => {
          toolsFactory.notifySucess("Fichier téléchargé avec succés");
          window.open("http://localhost:8080/downloadFileStagesCSV", "_blank");
        },
        (error) => {
          toolsFactory.notifyFailure(
            "Une erreur s'est produite, le fichier n'est pas téléchrger"
          );
        }
      );
    };

    const getAllStagesId = function (data) {
      let allIdStages = [];
      data.forEach((element) => allIdStages.push(element.idstage));
      return allIdStages;
    };

    // recuperer un stage avec Id
    $scope.allStagesInfosById = function (stageItem) {
      console.log(stageItem);
      stageFactory.getStageById(stageItem.idstage).then(
        function (success) {
          $scope.stageItem = success.data;
          $scope.getNomEntreprise($scope.stageItem);
          $scope.getNomPrenomEleve($scope.stageItem);
        },
        function (error) {
          //$scope.erreurAuthentification()
        }
      );
    };

    // recuperer le nom de l entreprise avec son id
    $scope.getNomEntreprise = function (stages) {
      stages.forEach((element) => {
        entreprisesFactory
          .getEntreprisesNameById(element.identreprise)
          .then(function (success) {
            element.nomentreprise = success.data[0].nomcomplet;
          });
      });
      return stages;
    };

    // recuperer le nom et le prenom de l'eleve avec son id
    $scope.getNomPrenomEleve = function (stage) {
      stage.forEach((element) => {
        userFactory.getEleveNameById(element.ideleve).then(function (success) {
          element.nomEleve = success.data[0].nom;
          element.prenomEleve = success.data[0].prenom;
        });
      });
    };

    $scope.setNbStagePerPage = function (selectedNb) {
      console.log(selectedNb);
      let index = selectedNb.selectedIndex;
      let nbStagePerPage = selectedNb.options[index].value;
    };

    // le stage à modifier
    $scope.currentItem = {};

    $scope.initModify = function (idstage) {
      let item;
      $scope.stages.forEach((element) => {
        if (element.idstage === idstage) item = element;
      });

      console.log(item)

      let titrestage = document.getElementById("Sujetdustage");
      titrestage.value = item.titrestage;
      let description = document.getElementById("Descriptiondustage");
      description.value = item.description;
      let nomentreprise = document.getElementById("Raisonsociale");
      nomentreprise.value = item.nomentreprise;
      let VilledeStage = document.getElementById("VilledeStage");
      VilledeStage.value = item.Ville;
      let PaysdeStage = document.getElementById("PaysdeStage");
      PaysdeStage.value = item.Pays;
      let datedebut = document.getElementById("Datededebut");
      datedebut.value = item.datedebut.substring(0, 10); // à fin de recuperer que la date YYYY-MM-DD
      let datefin = document.getElementById("Datedefin");
      datefin.value = item.datefin.substring(0, 10);

      // get nom and prenom eleve with his id
      userFactory.getEleveNameById(item.ideleve).then((success) => {
        let nomEleve = document.getElementById("NomEtudiant");
        item.nomEleve = success.data[0].nom;
        nomEleve.value = item.nomEleve;

        let prenomEleve = document.getElementById("PrenomEtudiant");
        item.prenomEleve = success.data[0].prenom;
        prenomEleve.value = item.prenomEleve;
      });

      // get nom et prenom encadrant
      userFactory.getEnsNameById(item.idens).then((success) => {
        let Nomenseignantencadrant = document.getElementById(
          "Nomenseignantencadrant"
        );
        item.Nomenseignantencadrant = success.data[0].nom;
        Nomenseignantencadrant.value = item.Nomenseignantencadrant;

        let Prenomenseignantencadrant = document.getElementById(
          "Prenomenseignantencadrant"
        );
        item.Prenomenseignantencadrant = success.data[0].prenom;
        Prenomenseignantencadrant.value = item.Prenomenseignantencadrant;
      });

      // get nom et prenom tuteur de stage
      userFactory.getTuteurNameById(item.idtuteur).then((success) => {
        let NomduTuteurdestagedanslentreprise = document.getElementById(
          "NomduTuteurDesStagesDansLentreprise"
        );
        item.nomTuteur = success.data[0].nom;
        NomduTuteurdestagedanslentreprise.value = item.nomTuteur;

        let PrenomduTuteurdestagedanslentreprise = document.getElementById(
          "PrenomduTuteurDesStagesDansLentreprise"
        );
        item.prenomTuteur = success.data[0].prenom;
        PrenomduTuteurdestagedanslentreprise.value = item.prenomTuteur;

        let MailTuteurdestagedanslentreprise = document.getElementById(
          "MailTuteurDesStageDansLentreprise"
        );
        item.emailtuteur = success.data[0].emailtuteur;
        MailTuteurdestagedanslentreprise.value = item.emailtuteur;
      });

      let Adressedustage = document.getElementById("Adressedustage");
      Adressedustage.value = item.adressestage;

      let Annee = document.getElementById("Annee");
      Annee.value = item.annee;

      let Niveau = document.getElementById("Niveau");
      Niveau.value = item.niveau;

      // le stage à modifier
      currentItem = item;
      //console.log(currentItem)
    };

    $scope.SaveModifications = function () {
      let titrestage = document.getElementById("Sujetdustage").value;
      let description = document.getElementById("Descriptiondustage").value;
      let nomentreprise = document.getElementById("Raisonsociale").value;
      let VilledeStage = document.getElementById("VilledeStage").value;
      let PaysdeStage = document.getElementById("PaysdeStage").value;
      let datedebut = document.getElementById("Datededebut").value;
      let datefin = document.getElementById("Datedefin").value;
      let prenomEleve = document.getElementById("PrenomEtudiant").value;
      let nomEleve = document.getElementById("NomEtudiant").value;
      let NomduTuteurdestagedanslentreprise = document.getElementById(
        "NomduTuteurDesStagesDansLentreprise"
      ).value;
      let PrenomduTuteurdestagedanslentreprise = document.getElementById(
        "PrenomduTuteurDesStagesDansLentreprise"
      ).value;
      let MailTuteurdestagedanslentreprise = document.getElementById(
        "MailTuteurDesStageDansLentreprise"
      ).value;
      let Adressedustage = document.getElementById("Adressedustage").value;
      let Prenomenseignantencadrant = document.getElementById(
        "Prenomenseignantencadrant"
      ).value;
      let Nomenseignantencadrant = document.getElementById(
        "Nomenseignantencadrant"
      ).value;
      let Annee = document.getElementById("Annee").value;
      let Niveau = document.getElementById("Niveau").value;

      let newItem = currentItem;
      // mettre a jour le stage avec les nouvelles informations
      newItem.titrestage = titrestage;
      newItem.description = description;
      newItem.nomentreprise = nomentreprise;
      newItem.VilledeStage = VilledeStage;
      newItem.PaysdeStage = PaysdeStage;
      newItem.datedebut = datedebut;
      newItem.datefin = datefin;
      newItem.MailTuteurdestagedanslentreprise = MailTuteurdestagedanslentreprise;
      newItem.NomduTuteurdestagedanslentreprise = NomduTuteurdestagedanslentreprise;
      newItem.PrenomduTuteurdestagedanslentreprise = PrenomduTuteurdestagedanslentreprise;
      newItem.Prenomenseignantencadrant = Prenomenseignantencadrant;
      newItem.Nomenseignantencadrant = Nomenseignantencadrant;
      newItem.prenomEleve = prenomEleve;
      newItem.nomEleve = nomEleve;
      newItem.Adressedustage = Adressedustage;
      newItem.annee = Annee;
      newItem.niveau = Niveau;

      console.log(newItem);
      let indexItem = $scope.stages.indexOf(currentItem);
      $scope.stages[indexItem] = newItem;

      updateStage(newItem);

      $("#modifyModal").modal("hide");
    };

    $scope.deleteStage = function () {
      stageFactory.deleteStage(DeleteStageItem.idstage).then(
        (success) => {
          toolsFactory.notifySucess("Le stages a été supprimé avec succés");
          $("#deleteModal").modal("hide");
        },
        (error) => {
          toolsFactory.notifyFailure("Erreur, le stage n'est pas supprimé");
        }
      );
    };

    updateStage = function (element) {
      stageFactory.updateStage(element.idstage, element).then(
        (success) => {
          toolsFactory.notifySucess("Le stage a été mis à jours avec succés");
        },
        (error) => {
          toolsFactory.notifyFailure(
            "Erreur, Les données du stage(s) ne sont pas enregistrées"
          );
        }
      );
    };

    $scope.init = function (item) {
      stageItem = item;
      console.log(item);
      $scope.allStagesInfosById(stageItem);
    };

    $scope.initDeleteStage = function (idstage) {
      let item;
      $scope.stages.forEach((element) => {
        if (element.idstage === idstage) item = element;
      });
      DeleteStageItem = item;
      console.log(DeleteStageItem);
    };

    $scope.checkIsAdmin();
  }
);
