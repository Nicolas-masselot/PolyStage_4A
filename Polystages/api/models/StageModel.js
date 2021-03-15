'user strict';
var moment = require('moment')

function formatDateForSQL(date) {
    return moment(date).format("YYYY/MM/DD")
}

//Task object constructor
var Stage = function (stage, idtuteur) {
    console.log('stage')
    this.ideleve = stage.idEleve;
    this.niveau = stage.niveau;
    this.annee = stage.annee;
    if (idtuteur != 0) this.idtuteur = idtuteur;
    this.idens = stage.idenseignant;
    this.datedebut = stage.debutstage;
    this.datefin = stage.finstage;
    this.identreprise = stage.identreprise;
    this.titrestage = stage.titrestage;
    this.description = stage.descriptionstage;
    this.adremailstage = stage.emailstage;
    this.adressestage = stage.adresseentreprise;
    this.Ville = stage.ville;
    this.Pays = stage.pays;
};

//Task object constructor
Stage.StageCsv = function (stage, idtuteur) {
    let stageObj = {
        niveau : stage.Niveau,
        annee : stage.Annee,
        idens: stage.idens,
        idtuteur : stage.idtuteur,
        datedebut : stage.Datededebut,
        datefin: stage.Datedefin,
        identreprise : stage.identreprise,
        titrestage : stage.Sujetdustage,
        description: stage.Description,
        ideleve: stage.ideleve,
        //adremailstage : stage.adremailstage,
        adressestage : stage.Adressedustage,
        Ville : stage.VilledeStage,
        Pays : stage.PaysdeStage
    }
    return stageObj;
};

Stage.upadteStageConst = function (stage, idtuteur) {
    let stageObj = {
        niveau : stage.niveau,
        annee : stage.annee,
        idens: stage.idens,
        idtuteur : stage.idtuteur,
        datedebut : stage.datedebut,
        datefin: stage.datefin,
        identreprise : stage.identreprise,
        titrestage : stage.titrestage,
        description: stage.description,
        ideleve: stage.ideleve,
        //adremailstage : stage.adremailstage,
        adressestage : stage.adressestage,
        Ville : stage.VilledeStage,
        Pays : stage.PaysdeStage
    }
    return stageObj;
};

function DateUpdate(stage) {
    stage.datedebut = formatDateForSQL(stage.datedebut);
    stage.datefin = formatDateForSQL(stage.datefin);
    delete stage.mdp
    return stage
}

Stage.getAllStage = function (result) {
    var query = "Select * from stage"
    db.query(query, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            //console.log(res)
            result(null, res);
        }
    });
};

Stage.getStageById = function (idstage, result) {
    var query = "Select * from stage left join tuteurs on tuteurs.idtuteur = stage.idtuteur left join entreprise on entreprise.identreprise = stage.identreprise where idstage = ?"
    db.query(query, idstage, function (err, res) {
        for (i in res) {
            res[i] = DateUpdate(res[i])
        }
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}   

// get all stage info by id 
Stage.getStageInfosById = function (idstage, result) {
    var query = "Select * from stage where idstage = ?"
    db.query(query, idstage, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getStageByIdForEval = function (idstage, result) {
    var query = "Select * from stage natural join eleves left join entreprise on entreprise.identreprise = stage.identreprise where idstage = ?"
    db.query(query, idstage, function (err, res) {
        for (i in res) {
            res[i] = DateUpdate(res[i])
        }
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getStageByEleveId = function (ideleve, result) {
    var query = "Select * from stage natural join entreprise where ideleve = ? order by annee desc"
    db.query(query, ideleve, function (err, res) {
        for (i in res) {
            res[i] = DateUpdate(res[i])
        }
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getStage = function (val, result) {
    let query
    if (parseInt(val))
        query = `Select * from stage where ( annee = ${val} ) or ( niveau = "${val}" ) `    
    else 
        query = `Select * from stage inner join entreprise on stage.identreprise = entreprise.identreprise where ( titrestage like '${val}%' ) or ( description like '${val}%' ) or (nomcomplet like '${val}%') `
    
    db.query(query, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getStageByTuteurId = function (idtuteur, result) {
    var query = "Select * from stage natural join entreprise left join eleves on eleves.ideleve = stage.ideleve where idtuteur = ? order by annee desc"
    db.query(query, idtuteur, function (err, res) {
        for (i in res) {
            res[i] = DateUpdate(res[i])
        }
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getStageByEnsId = function (idens, result) {
    var query = "Select * from stage natural join entreprise left join eleves on eleves.ideleve = stage.ideleve where idens = ? order by annee desc"
    db.query(query, idens, function (err, res) {
        for (i in res) {
            res[i] = DateUpdate(res[i])
        }
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getCurrentStageByEleveId = function (annee, ideleve, result) {

    var query = "Select * from stage where ideleve = ? and annee = ?"
    db.query(query, [ideleve, annee], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res)
        }
    });
}

Stage.getCurrentStageByTuteurId = function (annee, idtuteur, result) {

    var query = "Select * from stage left join eleves on eleves.ideleve = stage.ideleve where idtuteur = ? and annee = ?"
    db.query(query, [idtuteur, annee], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res)
        }
    });
}

Stage.getCurrentStageByEnsId = function (annee, idens, result) {

    var query = "Select * from stage left join eleves on eleves.ideleve = stage.ideleve where idens = ? and annee = ?"
    db.query(query, [idens, annee], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res)
        }
    });
}

Stage.createStage = function (newStage, result) {
    db.query("Select * from stage where ideleve = ? AND annee = ?",
        [newStage.ideleve, newStage.annee], function (err, stage) {
            if (err) {
                result(err, null);
            }
            if (stage && stage.length) {
                result(null, 409);
            }
            else {
                // formate date to YYYY/MM/DD to set into the database
                //console.log(newStage)
                newStage.datedebut = formatDate(newStage.datedebut)
                newStage.datefin = formatDate(newStage.datefin)
                //newStage.datefin = formatDate(newStage.datefin)
                //console.log(newStage)
                db.query("INSERT INTO stage set ?", newStage, function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    else {
                        result(null, 200);
                    }
                });
            }
        })
};

Stage.createStageFromCsv = function (newStage, result) {
    db.query("Select * from stage where ideleve = ? AND annee = ?",
        [newStage.ideleve, newStage.annee], function (err, stage) {
            if (err) {
                result(err, null);
            }
            if (stage && stage.length) {
                result(null, 409);
            }
            else {
                newStage.datedebut = reformatDateString(newStage.datedebut)
                newStage.datefin = reformatDateString(newStage.datefin)
                db.query("INSERT INTO stage set ?", newStage, function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    else {
                        result(null, 200);
                    }
                });
            }
        })
};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function reformatDateString(s) {
    var b = s.split(/\D/);
    return b.reverse().join('-');
  }

Stage.updateStage = function (idstage, newStage, result) {
    let query = "SELECT * FROM stage WHERE idstage = ?"
    db.query(query, [idstage], function (err, stage) {
        if (err) {
            result(err, null);
        }
        if (stage && stage.length) {
            //newStage.datedebut = reformatDateString(newStage.datedebut)
            //newStage.datefin = reformatDateString(newStage.datefin)
            db.query("UPDATE stage SET ? WHERE idstage = ?", [newStage, idstage], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    result(null, 200);
                }
            });
        }
        else {
            result(null, 404);
        }
    })
};

Stage.deleteStage = function (idstage, result) {
    let query = "DELETE FROM stage WHERE idstage = ?"
    db.query(query, [idstage], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res)
        }
    });
};

Stage.getStageByAnnee = function (result) {
    var query = "SELECT annee, COUNT(annee) as nbre_stage FROM stage GROUP BY annee"
    db.query(query, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getStageByLevel = function (result) {
    var query = "SELECT niveau, COUNT(niveau) as nbre FROM stage GROUP BY niveau"
    db.query(query, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getStageByCity = function (result) {
    var query = "SELECT ville, COUNT(ville) as nbre_stage FROM `stage` GROUP BY ville"
    db.query(query, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

module.exports = Stage;
