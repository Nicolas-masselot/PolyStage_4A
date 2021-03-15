controllers.controller('formController', function ($scope, $rootScope, questionsFactory, entreprisesFactory, enseignantsFactory, stageFactory, $location) {
  $scope.createStage = function (idEleve, nometu, prenometu, annee, niveau, idenseignant, nomtuteur, prenomtuteur, emailtuteur, identreprise,
    adresseentreprise, titrestage, descriptionstage, emailstage, debutstage, finstage, ville, pays) {
    if ($scope.isValid(idEleve, nometu, prenometu, annee, niveau, identreprise, titrestage, debutstage, finstage, ville, pays)) {
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
      data.ville = ville
      data.pays = pays

      stageFactory.createStage(data).then(success => {
        $location.path("/home")
        toastr.success("Le stage a bien été créé")
      }, error => {
        toastr.error("Une erreur s'est produite")
      })
    }
  }

  $scope.isValid = function (idEleve, nometu, prenometu, annee, niveau, identreprise, titrestage, debutstage, finstage, ville, pays) {
    var res = false
    console.log(titrestage)
    console.log(ville)
    if (idEleve && nometu && prenometu && annee && niveau && identreprise && titrestage && debutstage && finstage && ville && pays)
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
    $('.mdb-select.select-ent').materialSelect()
    $('.mdb-select.select-ens').materialSelect()
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