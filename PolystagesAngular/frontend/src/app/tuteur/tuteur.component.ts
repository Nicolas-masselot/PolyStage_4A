import { Component, OnInit } from '@angular/core';
import {MessageService} from "../message/message.service";
import {AuthService} from "../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import * as moment from 'moment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tuteur',
  templateUrl: './tuteur.component.html',
  styleUrls: ['./tuteur.component.scss']
})
export class TuteurComponent implements OnInit {

  stages: any[] = [];
  moment: any = moment ;

  constructor(private service: MessageService,
              private auth: AuthService,
              private toastr: ToastrService,  private router: Router)
  {
    moment.locale('fr')
  }

  ngOnInit(): void
  {
    this.getTuteurStages();

  }

  getTuteurStages(): void
  {
    let data = {};
    let idTuteur = this.auth.id;
    let response = this.service.sendGetMessageQuery("stages/tuteurs/"+idTuteur, data);
    response.subscribe(
      r => {this.recupererStages(r);},
      error => {console.log(error);}
    );
  }

  getCurrentTuteurStages(annee1: number): void
  {
    let data = {annee: annee1, endID: this.auth.id};
    let response = this.service.sendGetMessageQuery("stages/tuteur/stage", data);
    response.subscribe(
      r => {this.recupererStages(r);},
      error => {console.log(error);}
    );
  }

  recupererStages(data: any): void
  {
    this.stages = data;
  }

  evaluer(idStage: number): void
  {
    this.router.navigate(['eval' , { stageId: idStage}]).then(() => {});
  }

  evaluerCompetences(idstage : number): void
  {
    this.router.navigate(['competences', { stageId: idstage}]).then(() => {}) ;
  }

}
