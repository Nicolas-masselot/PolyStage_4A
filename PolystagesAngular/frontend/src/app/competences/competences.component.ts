import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../message/message.service";
import {AuthService} from "../auth/auth.service";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.scss']
})
export class CompetencesComponent implements OnInit {

  idStage : number | undefined;
  stage: any ;

  competences: any ;

  FormComp = this.fb.group({});

  fields = {
    nomentreprise: undefined,
    nomtuteur: undefined,
    annee: undefined,
    niveau: undefined,
    nom: undefined,
    prenom: undefined,
    idtuteur: undefined,
    idens: undefined

  }

  constructor( private route: ActivatedRoute, private message: MessageService, private auth : AuthService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.idStage = Number(this.route.snapshot.paramMap.get('stageId')) ;
    this.message.sendGetMessagebyID('stages/eval/',this.idStage).subscribe( reponse => {
      // @ts-ignore
      this.stage = reponse[0] ;
    }) ;

    this.message.sendGetMessageQuery('recupCompetences',null).subscribe( reponse => {
      this.competences =reponse ;

      this.fields.nomentreprise = this.stage.nomcomplet ;
      // @ts-ignore
      this.fields.nomtuteur = this.auth.prenom + ' ' + this.auth.nom ;
      this.fields.annee = this.stage.annee;
      this.fields.niveau = this.stage.niveau;
      this.fields.nom = this.stage.nom;
      this.fields.prenom = this.stage.prenom;
      this.fields.idtuteur = this.stage.idtuteur;
      this.fields.idens = this.stage.idens;

      for (let categorie of this.competences) {
        for (let quest of categorie.questions){
          this.FormComp.addControl(quest.idcompetence,new FormControl()) ;
        }
      }

    }) ;



  }

  submitCompetences() : void {
    Object.keys(this.FormComp.controls).forEach(key => {

      if (this.FormComp.controls[key].value !== null){
        // @ts-ignore
        this.fields[key] = this.FormComp.controls[key].value ;
      }

    });
    console.log(this.fields) ;
    //TODO envoyer en post fields
  }

}
