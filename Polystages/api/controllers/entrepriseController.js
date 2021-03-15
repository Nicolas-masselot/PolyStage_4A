'use strict';

var Entreprise = require('../models/EntrepriseModel.js');

exports.list_all_entreprises = function (req, res) {
  Entreprise.getAllEntreprise(req.query.fields, function (err, entreprises) {
    if (err)
      res.send(err);
    res.send(entreprises);
  });
};

exports.get_entreprise_name_by_id = function (req, res) {
  Entreprise.getEntrepriseById(req.params.identreprise, function (err, entreprises) {
    if (err)
      res.send(err);
    res.send(entreprises);
  });
};

exports.get_entreprise_id_by_name = function (req, res) {
  Entreprise.getEntrepriseByName(req.params.entrepriseName, function (err, entreprises) {
    if (err)
      res.send(err);
    res.send(entreprises);
  });
};

exports.create_entreprise = function (req, res) {
  Entreprise.createEntreprise(req.body, function (err, entreprise) {
    if (err)
      res.send(err);
    if (entreprise[0]) res.sendStatus(409)
    else res.sendStatus(201)
  });
}
