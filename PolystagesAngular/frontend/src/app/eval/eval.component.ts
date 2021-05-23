import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../message/message.service";

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.scss']
})
export class EvalComponent implements OnInit {

  idStage : number | undefined;

  choixOuiNon: string[] = ["Oui", "Non"] ;
  choixContrat: string[] = ["CDD", "CDI", "Prolongation de stage", "Contrat de thèse en entreprise", "VIE"] ;
  choixClassement: string[] = ["Parmi les meilleurs", "Au dessus de la moyenne", "À la moyenne", "En dessous de la moyenne", "Parmi les plus mauvais"] ;
  choixNotation: string[] = ["Très bien", "Bien", "Moyen", "Insuffisant", "Sans objet"] ;

  questions : any ;
  constructor(private route: ActivatedRoute, private message : MessageService) { }

  ngOnInit(): void {
    this.idStage = Number(this.route.snapshot.paramMap.get('stageId')) ;
    console.log(this.idStage) ;

    this.message.sendGetMessageQuery('recupQuestions',null).subscribe( reponse => {
      this.questions =reponse ;
      console.log(this.questions) ;
    }) ;
  }

}
