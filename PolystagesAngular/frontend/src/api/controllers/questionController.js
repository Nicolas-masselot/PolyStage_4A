'use strict';

var Question = require('../models/QuestionModel.js');
var Competence = require('../models/CompetenceModel.js');
const csv = require('csvtojson') ;

exports.getQuestionsByCat = function (req, res) {
  Question.list_QuestionsByCat(req.params.id, function (err, questions) {
    if (err)
      res.status(500).send(err);
    if (questions && questions.length) {
      let queryTitle = "SELECT name FROM categorie WHERE idcat = ?";
      db.query(queryTitle, [req.params.id], (err, title) => {
        if (err) {
          res.status(500).send(err);
        }
        if (title && title.length) {
          res.status(200).send({
            questions: questions,
            title: title[0].name
          });
        } else {
          res.status(401).send("Pas de titre dans cette catégorie");
        }
      })
    } else {
      res.status(401).send("No questions were found");
    }
  })
}

exports.list_AllCompetences = function (req, res) {
  Competence.getAllCompetences(function (err, competences) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    res.status(200).send(competences)
  })
}

exports.list_AllChoixByIdcomp = function (req, res) {
  Competence.getAllNiveauxByIdComp(req.params.idcompetence, function (err, competences) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    res.status(200).send(competences)
  })
}

async function lirequestions(chemin,nomcategorie) {
  const questions = await csv({delimiter: ';'}).fromFile(chemin);
  return {
    nomcat: nomcategorie,
    questions: questions
  } ;
}

exports.RecupQuestionsCsv = function (req,res) {
  (async () => {
    let retourQuestions = [] ;

    let questionsCat1 = await lirequestions('public/questions/QuestionsCategorie1.csv',"IDENTIFICATION") ;
    retourQuestions.push(questionsCat1) ;
    let questionsCat2 = await lirequestions('public/questions/QuestionsCategorie2.csv',"ÉVALUATION DES COMPÉTENCES") ;
    retourQuestions.push(questionsCat2) ;
    let questionsCat3 = await lirequestions('public/questions/QuestionsCategorie3.csv',"APPRÉCIATION GLOBALE SUR LE STAGE") ;
    retourQuestions.push(questionsCat3) ;
    let questionsCat4 = await lirequestions('public/questions/QuestionsCategorie4.csv',"APRÈS LE STAGE") ;
    retourQuestions.push(questionsCat4) ;
    let questionsCat5 = await lirequestions('public/questions/QuestionsCategorie5.csv',"SOUTENANCE DE STAGE") ;
    retourQuestions.push(questionsCat5) ;

    res.status(200).send(retourQuestions) ;
  })()
}

exports.RecupCompetencesCsv = function (req,res) {
  (async () => {

    let retourCompetences = [] ;

    let Competencescat1 = await lirequestions('public/competences/CompetencesCategorie1.csv',"Aspects scientifiques et techniques") ;
    retourCompetences.push(Competencescat1) ;
    let Competencescat2 = await lirequestions('public/competences/CompetencesCategorie2.csv',"Adaptation aux exigences de l'entreprise et de la société") ;
    retourCompetences.push(Competencescat2) ;
    let Competencescat3 = await lirequestions('public/competences/CompetencesCategorie3.csv',"Dimension personnelle, organisationnelle et culturelle") ;
    retourCompetences.push(Competencescat3) ;

    res.status(200).send(retourCompetences) ;
  })()
}
