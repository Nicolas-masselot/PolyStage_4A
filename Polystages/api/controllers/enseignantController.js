'use strict';

var Enseignant = require('../models/EnseignantModel.js');


exports.list_all_enseignants = function (req, res) {
  Enseignant.getAllEnseignant(function (err, enseignants) {

    if (err)
      res.send(err);
    res.send(enseignants);
  });
};

exports.get_enseignantId_By_nom_prenom = function (req, res) {
  Enseignant.getEnseignantIdByNomAndPrenom(req.query.nom, req.query.prenom, function (err, enseignants) {
    if (err)
      res.send(err);
    res.send(enseignants);
  });
};

exports.get_ens_name_by_id = function (req, res) {
  console.log(req.query.idens)
  Enseignant.getEnseignantById(req.query.idens, function (err, enseignants) {
    if (err)
      res.send(err);
    res.send(enseignants);
  });
};
