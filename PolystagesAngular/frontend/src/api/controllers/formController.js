//Will manage all form received

const Tuteur = require('../models/TuteurModel.js');
const Stage = require('../models/StageModel.js');
const StageCsv = require('../models/StageModel.js');
const Enseignant = require('../models/EnseignantModel.js');
const Entreprise = require('../models/EntrepriseModel.js');
const Eleve = require('../models/EleveModel.js');
const Mail = require('../models/MailModel.js');
const fs = require('fs');
const moment = require('moment');
const carbone = require('carbone');

function sendConfirmation(nomeleve, prenomeleve, idens, idtuteur, nomfich, path) {
  Tuteur.getTuteurById(idtuteur, function (err, tuteur) {
    var emailtuteur = tuteur[0].emailtuteur;
    Enseignant.getEnseignantById(idens, function (err, ens) {
      var emailens = ens[0].emailens;
      var destinataire = emailtuteur + ', ' + emailens;
      var sujet = "Evaluation de stage de l'élève " + prenomeleve + " " + nomeleve + " complétée"
      var corps = "Bonjour,</br></br>Vous trouverez en pièce jointes l'évaluation du stage de " + prenomeleve + " " + nomeleve + " complétée.</br></br>"
        + "Nous vous souhaitons une agréable journée,</br>"
        + "L'équipe BILO</br>"
        + '<img src="https://polytech.univ-amu.fr/sites/polytech.univ-amu.fr/files/logo.png" alt="Logo Polytech Marseille"/>';
      Mail.send_mail_attach(destinataire, sujet, corps, nomfich, path)
    })
  })
}

function sendConfirmationComp(nomeleve, prenomeleve, idens, idtuteur, nomfich, path) {
  Tuteur.getTuteurById(idtuteur, function (err, tuteur) {
    var emailtuteur = tuteur[0].emailtuteur;
    Enseignant.getEnseignantById(idens, function (err, ens) {
      var emailens = ens[0].emailens;
      var destinataire = emailtuteur + ', ' + emailens;
      var sujet = "Evaluation de stage de l'élève " + prenomeleve + " " + nomeleve + " complétée"
      var corps = "Bonjour,</br></br>Vous trouverez en pièce jointes l'évaluation des compétences de " + prenomeleve + " " + nomeleve + " complétée.</br></br>"
        + "Nous vous souhaitons une agréable journée,</br>"
        + "L'équipe BILO</br>"
        + '<img src="https://polytech.univ-amu.fr/sites/polytech.univ-amu.fr/files/logo.png" alt="Logo Polytech Marseille"/>';
      Mail.send_mail_attach(destinataire, sujet, corps, nomfich, path)
    })
  })

}
exports.FormEleve = function (req, res) {

  if (req.body.adresseentreprise) {
    Entreprise.updateEntreprise(req.body, function (res) { })
  }
  if (req.body.nomtuteur) {
    //Verification du tuteur crée si non existe
    Tuteur.createTuteur(req.body, function (err, result) {
      if (err)
        res.status(500).send(err);
      var idtuteur = result
      //Crée le stage
      var new_stage = new Stage(req.body, idtuteur);
      Stage.createStage(new_stage, function (err, resultat) {
        if (err)
          res.status(500).send(err);
        if (resultat) {
          res.status(resultat).send();
        }
      })
    })
  } else {
    var new_stage = new Stage(req.body, 0);
    Stage.createStage(new_stage, function (err, result) {
      if (err) res.status(500).send(err);
      res.status(result).send();
    })
  }
}

exports.FormEleveCsv = function (req, res) {
  if (req.body.adresseentreprise) {
    Entreprise.updateEntreprise(req.body, function (res) { })
  }
  if (req.body.nomtuteur) {
    //Verification du tuteur crée si non existe
    Tuteur.createTuteur(req.body, function (err, result) {
      if (err)
        res.status(500).send(err);
      var idtuteur = result
      //Crée le stage
      var new_stage = new Stage(req.body, idtuteur);
      Stage.createStageFromCsv(new_stage, function (err, result) {
        if (err)
          res.status(500).send(err);
        if (result && result.length) {
          res.status(200).send(result);
        }
      })
    })
  } else {
    console.log('hello there')
    let new_stage = Stage.StageCsv(req.body, 0);
    Stage.createStageFromCsv(new_stage, function (err, result) {
      if (err) res.status(500).send(err);
      res.status(result).send();
    })
  }
}

exports.FormEval = function (req, res) {

  var options = {
    convertTo: 'pdf' //can be docx, txt, ...
  };

  var nomfich = req.body.annee + '_' + req.body.niveau + 'A_' + req.body.nom + '_' + req.body.prenom + '_evaluation.pdf'
  var path = 'public/' + req.body.annee + '/' + req.body.niveau + 'A/'
    + nomfich
  var dirresult = './public/' + req.body.annee + '/' + req.body.niveau + 'A/'
    + nomfich
  var template = './public/templates/';
  if (req.body.niveau === 5) {
    template = template + 'template5a.odt'
  } else {
    template = template + 'template4a.odt'
  }

  try {
    fs.mkdirSync('./public/' + req.body.annee) ;
  } catch (e){ console.log(e);}
  try {
    fs.mkdirSync('./public/' + req.body.annee + '/' + req.body.niveau + 'A') ;
  } catch (e){ console.log(e);}

  carbone.render(template, req.body, options, function (err, result) {
    if (err) return console.log(err);
    var newStage = {}
    newStage.chemineval = dirresult;
    newStage.dateeval = moment(req.body.datetime).format("YYYY/MM/DD HH:mm:ss");
    Stage.updateStage(req.params.idstage, newStage, function (err, stage) { })
    sendConfirmation(req.body.nom, req.body.prenom, req.body.idens, req.body.idtuteur, nomfich, path);
    fs.writeFileSync(dirresult, result);
    res.status(200).send();
  });

}

exports.FormComp = function (req, res) {
  var options = {
    convertTo: 'pdf' //can be docx, txt, ...
  };

  var nomfich = req.body.annee + '_' + req.body.niveau + 'A_' + req.body.nom + '_' + req.body.prenom + '_competences.pdf'
  var path = 'public/' + req.body.annee + '/' + req.body.niveau + 'A/'
    + nomfich
  var dirresult = './public/' + req.body.annee + '/' + req.body.niveau + 'A/'
    + nomfich

  try {
      fs.mkdirSync('./public/' + req.body.annee) ;
  } catch (e){ console.log(e);}
  try {
      fs.mkdirSync('./public/' + req.body.annee + '/' + req.body.niveau + 'A') ;
  } catch (e){ console.log(e);}
  var template = './public/templates/template_competences.odt';

  carbone.render(template, req.body, options, function (err, result) { // idem
    if (err) return console.log(err);
    var newStage = {}
    newStage.chemincomp = dirresult;
    newStage.datecomp = moment(req.body.datetime).format("YYYY/MM/DD HH:mm:ss");
    Stage.updateStage(req.params.idstage, newStage, function (err, stage) { })
    sendConfirmationComp(req.body.nom, req.body.prenom, req.body.idens, req.body.idtuteur, nomfich, path);
    fs.writeFileSync(dirresult, result);
    res.status(200).send();
  });

}

exports.update_stage_byId = function (req, res) {
  var newStage = new Stage(req.body.body,req.body.body.idtuteur);
  console.log(newStage)
  if (req.body.adresseentreprise) {
    Entreprise.updateEntreprise(req.body, function (res) { })
  }
  if (req.body.emailtuteur) {
    Tuteur.createTuteur(req.body, function (err, result) {
      if (err) res.status(500).send(err);
      newStage.idtuteur = result;
      Stage.updateStage(req.params.idstage, newStage, function (err, stage) {
        if (err)
          res.send(err);
        res.status(stage).send()
      })
    })
  } else {
    Stage.updateStage(req.params.idstage, newStage, function (err, stage) {
      if (err)
        res.send(err);
      res.status(stage).send()
    })
  }
}

exports.update_stageInfos_byId = function (req, res) {

  var newStage = Stage.upadteStageConst(req.body.body);
  //console.log(newStage)
  if (req.body.body.adresseentreprise) {
    Entreprise.updateEntreprise(req.body.body, function (res) { })
  }
  // si nous avons mis a jour le tuteur
  if (req.body.body.emailtuteur && req.body.body.nomTuteur && req.body.body.prenomTuteur) {
    Tuteur.createTuteur(req.body.body, function (err, result) {
      if (err) res.status(500).send(err);
      if (result) {
        newStage.idtuteur = result;
      }
    })
  }
  // si nous avons mis a jour le nom de l entreprise
  if (req.body.body.nomentreprise) {
    Entreprise.getEntrepriseByName(req.body.body.nomentreprise, function (err, result) {
      if (err) res.status(500).send(err);
      if (result[0]) {
        newStage.identreprise = result[0].identreprise;
      }
    })
  }
  // si nous avons mis a jour l'encadrant
  if (req.body.body.Nomenseignantencadrant && req.body.body.Prenomenseignantencadrant) {
    let nomEncad = req.body.body.Nomenseignantencadrant
    let prenomEncad = req.body.body.Prenomenseignantencadrant
    Enseignant.getEnseignantIdByNomAndPrenom(nomEncad, prenomEncad, function (err, result) {
      if (err) res.status(500).send(err);
      if (result[0]) {
        newStage.idens = result[0].idens;
      }
    })
  }
  // si nous avons mis a jour les infos de l'étudiant
  if (req.body.body.nomEleve && req.body.body.prenomEleve) {
    let nomEleve = req.body.body.nomEleve
    let prenomEleve = req.body.body.prenomEleve
    Eleve.getEleveIdByNomAndPrenom(nomEleve, prenomEleve, function (err, result) {
      if (err) res.status(500).send(err);
      if (result[0]) {
        newStage.ideleve = result[0].ideleve;
      }
    })
  }
    Stage.updateStage(req.params.idstage, newStage, function (err, stage) {
      if (err)
        res.send(err);
      res.status(stage).send()
    })

}
