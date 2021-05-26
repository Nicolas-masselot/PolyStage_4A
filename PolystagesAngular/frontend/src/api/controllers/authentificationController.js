'use strict';


const sessionJwt = require ('./sessionJWT');


const Eleve = require('../models/EleveModel.js');
const Enseignant = require('../models/EnseignantModel.js');
const Tuteur = require('../models/TuteurModel.js');

exports.authentification = function (req, res) {
  Eleve.getEleveAuth(req.query.username, req.query.password, function (err, result) {
    if (err)
      res.status(500).send(err);
    if (result && result.length) {
      Eleve.getEleveById(result[0].ideleve, function (err, eleve) {

        setSessionCookie(req, res, {login: req.query.username, role: "eleve"});

        eleve[0].role = "eleve";
        res.status(200).send(eleve);
      })
    } else {
      Enseignant.getEnsAuth(req.query.username, req.query.password, function (err, resEns) {
        if (err)
          res.status(500).send(err);
        if (resEns && resEns.length) {

          setSessionCookie(req, res, {login: req.query.username, role: "enseignant"});

          resEns[0].role = "enseignant";
          res.status(200).send(resEns);
        } else {
          Tuteur.getTuteurAuth(req.query.username, req.query.password, function (err, resTuteur) {
            if (err)
              res.status(500).send(err);
            if (resTuteur && resTuteur.length) {

              setSessionCookie(req, res, {login: req.query.username, role: "tuteur"});

              resTuteur[0].role = "tuteur";
              res.status(200).send(resTuteur);
            } else {
              res.status(401).send("Authentification Failed");
            }
          })
        }
      })
    }
  });
}


function getSession (req) {
  return sessionJwt.decodeSessionCookie(req);
}
module.exports.getSession = getSession;

function setSessionCookie (req, res, session) {
  sessionJwt.createSessionCookie(req, res, session);
}
module.exports.setSessionCookie = setSessionCookie;

