'use strict';

var Tuteur = require('../models/TuteurModel.js');

exports.list_all_tuteurs = function (req, res) {
  Tuteur.getAllTuteur(function (err, tuteurs) {
    if (err)
      res.send(err);
    res.send(tuteurs);
  });
};

exports.get_tuteur_id_by_nom_and_prenom = function (req, res) {
  Tuteur.getTuteurIdByNomAndPrenom(req.query.nom, req.query.prenom, function (err, tuteurs) {
    if (err)
      res.send(err);
    res.send(tuteurs);
  });
};

exports.get_tuteur_name_by_id = function (req, res) {
  Tuteur.getTuteurById(req.query.idtuteur, function (err, tuteurs) {
    if (err)
      res.send(err);
    res.send(tuteurs);
  });
};