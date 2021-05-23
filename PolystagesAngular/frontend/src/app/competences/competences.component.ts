import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../message/message.service";

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.scss']
})
export class CompetencesComponent implements OnInit {

  idStage : number | undefined;

  competences: any ;

  constructor( private route: ActivatedRoute, private message: MessageService) { }

  ngOnInit(): void {
    this.idStage = Number(this.route.snapshot.paramMap.get('stageId')) ;
    console.log(this.idStage) ;

    this.message.sendGetMessageQuery('recupCompetences',null).subscribe( reponse => {
      this.competences =reponse ;
      console.log(this.competences) ;
    }) ;
  }

}
