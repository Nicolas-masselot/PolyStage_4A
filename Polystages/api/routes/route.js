'use strict';
module.exports = function (app) {
  var EntrepriseControlleur = require('../controllers/entrepriseController');
  var EnseignantControlleur = require('../controllers/enseignantController');
  var EleveControlleur = require('../controllers/eleveController');
  var TuteurControlleur = require('../controllers/tuteurController');
  var StageControlleur = require('../controllers/stageController');
  var Authentification = require('../controllers/authentificationController');
  var FileControlleur = require('../controllers/fileController');
  var QuestionControlleur = require('../controllers/questionController');
  var FormControlleur = require('../controllers/formController');
  var MailControlleur = require('../controllers/mailController')
  var ConvertJson  = require('../ConvertJson/convertJsonToCsv')
  
  app.route('/entreprises')
    .get(EntrepriseControlleur.list_all_entreprises)
    .post(EntrepriseControlleur.create_entreprise); //manquante dans doc
  
  app.route('/entreprises/ById/:identreprise')
    .get(EntrepriseControlleur.get_entreprise_name_by_id)
  
  app.route('/entreprises/ByName/:entrepriseName')
    .get(EntrepriseControlleur.get_entreprise_id_by_name)
  
  app.route('/enseignants')
    .get(EnseignantControlleur.list_all_enseignants);
  
  app.route('/enseignantsNameById')
    .get(EnseignantControlleur.get_ens_name_by_id);
  
  app.route('/enseignantsId/ByNomPrenom')
    .get(EnseignantControlleur.get_enseignantId_By_nom_prenom);

  app.route('/eleves')
    .get(EleveControlleur.list_all_eleve);

  app.route('/elevesId/byNomAndPrenom')
    .get(EleveControlleur.get_eleve_id_by_nom_and_prenom);

  app.route('/eleves/retard')
    .get(MailControlleur.list_all_retard_eleve);

  app.route('/eleves/:eleveId')
    .get(EleveControlleur.get_eleve_infos);

  app.route('/tuteurs')
    .get(TuteurControlleur.list_all_tuteurs);
  
  app.route('/tuteurId/byNomAndPrenom')
    .get(TuteurControlleur.get_tuteur_id_by_nom_and_prenom);

  app.route('/tuteurNameById')
    .get(TuteurControlleur.get_tuteur_name_by_id);

  app.route('/tuteurs/retard')
    .get(MailControlleur.list_all_retard_tuteur);

  app.route('/stages')
    .get(StageControlleur.list_all_stages);
  
  app.route('/stages/update')
    .get(MailControlleur.verif_dates_stage);

  app.route('/stages/:idstage')
    .get(StageControlleur.list_stage_byId)
    .put(FormControlleur.update_stage_byId);

  app.route('/stageInfos/:idstage')
    .get(StageControlleur.list_stage_byId)
    .put(FormControlleur.update_stageInfos_byId);
  
  app.route('/stagesInfosById/:idstage')
    .get(StageControlleur.list_stage_InfosbyId)

  app.route('/stages/byVal/:val')
    .get(StageControlleur.list_stage_byVal);

  app.route('/stages/eval/:idstage')
    .get(StageControlleur.list_stage_byIdForEval)
    .post(FormControlleur.FormEval);

  app.route('/stages/evalcompetences/:idstage')
    .post(FormControlleur.FormComp);
   
  app.route('/stages/byIdEleve/:ideleve')
    .get(StageControlleur.list_stage_byeleveId);

  app.route('/deleteStage/:idstage')
    .get(StageControlleur.delete_stage_by_id)

  
  app.route('/current/eleve/stage')
    .get(StageControlleur.current_stage);

  app.route('/current/tuteur/stage')
    .get(StageControlleur.current_tuteur_stage);

  app.route('/current/ens/stage')
    .get(StageControlleur.current_ens_stage);

  app.route('/stages/eleves/:eleveId')
    .get(StageControlleur.list_stage_byeleveId);

  app.route('/stages/tuteurs/:tuteurId')
    .get(StageControlleur.list_stage_bytuteurId);

  app.route('/stages/ens/:ensId')
    .get(StageControlleur.list_stage_byensId);

  app.route('/authentification')
    .get(Authentification.authentification);

  app.route('/upload')
    .post(FileControlleur.uploadFile);

  app.route('/questionsByCat/:id')
    .get(QuestionControlleur.getQuestionsByCat);

  app.route('/competences')
    .get(QuestionControlleur.list_AllCompetences);

  app.route('/competences/:idcompetence')
    .get(QuestionControlleur.list_AllChoixByIdcomp);

  app.route('/forms/eleve')
    .post(FormControlleur.FormEleve);
  
  app.route('/forms/eleve/csv')
    .post(FormControlleur.FormEleveCsv);

  app.route('/mail/evaluation')
    .post(MailControlleur.proced_eval)

  app.route('/mail/rappel')
    .post(MailControlleur.send_rappels)
    
  // route vers le fichier pour la conversion d'un seul stage (json to csv )
  app.route('/convertOneStageJsonToCsv')
    .post(ConvertJson.convertOneStageJsonToCsv)
  
  // route vers le fichier pour la conversion de tous les stages (json to csv )
  app.route('/convertAllStagesJsonToCsv')
    .post(ConvertJson.convertAllStagesJsonToCsv)
  
  // route vers le fichier pour la conversion d'un fichier csv (stages) en json
  app.route('/convertStagesCsvToJson')
    .post(ConvertJson.convertStagesCsvToJson)
  
  // donwload fichier stages.csv
  app.route('/downloadFileStagesCSV')
    .get(ConvertJson.downloadStagesCsv)
  
  // Routes pour les stats
  app.route('/statistique/1')
    .get(StageControlleur.list_stage_byAnnee);
  
  app.route('/statistique/2')
    .get(StageControlleur.list_stage_byLevel);

  app.route('/statistique/3')
    .get(StageControlleur.list_stage_byCity);
};
