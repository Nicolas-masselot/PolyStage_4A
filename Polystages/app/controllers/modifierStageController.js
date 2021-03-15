controllers.controller('modifierStageController', function ($scope, $rootScope, questionsFactory, entreprisesFactory, enseignantsFactory, stageFactory, $routeParams, $filter, $location) {
  $scope.editStage = function (idEleve, nometu, prenometu, annee, niveau, idenseignant, nomtuteur, prenomtuteur, emailtuteur, identreprise,
    adresseentreprise, titrestage, descriptionstage, emailstage, debutstage, finstage) {
    if ($scope.isValid(idEleve, nometu, prenometu, annee, niveau, identreprise, titrestage, debutstage, finstage) && $scope.verifTuteur(nomtuteur, prenomtuteur, emailtuteur)) {
      var data = {}
      data.idEleve = idEleve
      data.nometu = nometu
      data.prenometu = prenometu
      data.annee = annee
      data.niveau = niveau
      data.idenseignant = idenseignant
      data.nomtuteur = nomtuteur
      data.prenomtuteur = prenomtuteur
      data.emailtuteur = emailtuteur
      data.identreprise = identreprise
      data.adresseentreprise = adresseentreprise
      data.titrestage = titrestage
      data.descriptionstage = descriptionstage
      data.emailstage = emailstage
      data.debutstage = moment(debutstage, 'DD/MM/YYYY').format('YYYY-MM-DD')
      data.finstage = moment(finstage, 'DD/MM/YYYY').format('YYYY-MM-DD')

      stageFactory.editStage($routeParams.idstage, data).then(success => {
        $location.path("/home")
        toastr.success("Le stage a bien été modifié")
      }, error => {
        toastr.error("Une erreur s'est produite")
      })
    }
  }

  $scope.verifTuteur = function (nomtuteur, prenomtuteur, emailtuteur) {
    res = true
    if (emailtuteur) {
      if (nomtuteur && prenomtuteur)
        res = true
      else {
        toastr.error('Remplissez tous les champs du tuteur entreprise')
        res = false
      }
    }
    return res
  }

  $scope.isValid = function (idEleve, nometu, prenometu, annee, niveau, identreprise, titrestage, debutstage, finstage) {
    var res = false
    if (idEleve && nometu && prenometu && annee && niveau && identreprise && titrestage && debutstage && finstage)
      res = true
    else
      toastr.error("Veuillez remplir tous les champs obligatoires")
    return res
  }

  $scope.modalAddEntreprise = function () {
    $('#modalAddEntreprise').modal('show')
  }

  $scope.addEntreprise = function (nouvelle) {
    if (nouvelle) {
      entreprisesFactory.addEntreprise(nouvelle).then(success => {
        $('#modalAddEntreprise').modal('hide')
        toastr.success("Entreprise ajoutée")
      }, error => {
        toastr.error("Entreprise déjà présente")
      })

      //dans le cas ou deux étudiants créé un stage pour la même entreprise à qlq instants d'écart
      entreprisesFactory.getEntreprisesName()
        .then(function (success) {
          $scope.entreprisesName = success.data
        }, function (error) {
          console.log(error)
        })
    }
    else
      toastr.error("Veuillez remplir le champ obligatoire")
  }

  stageFactory.getStageById($routeParams.idstage)
    .then(success => {
      $scope.idenseignant = success.data[0].idens
      $scope.nomtuteur = success.data[0].nom
      $scope.prenomtuteur = success.data[0].prenom
      $scope.emailtuteur = success.data[0].emailtuteur
      $scope.identreprise = success.data[0].identreprise
      $scope.adresseentreprise = success.data[0].adressestage
      $scope.titrestage = success.data[0].titrestage
      $scope.descriptionstage = success.data[0].description
      $scope.emailstage = success.data[0].adremailstage
      $scope.entrepriseName = success.data[0].nomcomplet
      $scope.debutstage = $filter('amDateFormat')(success.data[0].datedebut, 'DD/MM/YYYY')
      $scope.finstage = $filter('amDateFormat')(success.data[0].datefin, 'DD/MM/YYYY')
    }, error => {
      console.log(error)
    })

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

  entreprisesFactory.getEntreprises()
    .then(function (success) {
      $scope.entreprises = success.data
    }, function (error) {
      console.log(error)
    })

  entreprisesFactory.getEntreprisesName()
    .then(function (success) {
      $scope.entreprisesName = success.data
    }, function (error) {
      console.log(error)
    })

  enseignantsFactory.getEnseignants()
    .then(function (success) {
      $scope.enseignants = success.data
    }, function (error) {
      console.log(error)
    })

  $(document).ready(function () {
    $('.select-ens').materialSelect()
    $('.select-ent').materialSelect()
    $('.datepicker').pickadate({
      min: new Date(),
      monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre',
        'Novembre', 'Décembre'],
      weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      today: 'aujourd\'hui',
      clear: 'effacer',
      format: 'dd/mm/yyyy',
      formatSubmit: 'dd/mm/yyyy'
    })
  })
  $rootScope.checkConnexion()
})