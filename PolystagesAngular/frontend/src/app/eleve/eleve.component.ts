import { Component, OnInit } from '@angular/core';
import {StageEleve} from "../dataTemplate/StageEleve";
import {MessageService} from "../message/message.service";
import {AuthService} from "../auth/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss']
})
export class EleveComponent implements OnInit {

  stages: any[] = [];

  myRandomImg: string = "0"; // 0-10

  constructor(private service: MessageService,
              private auth: AuthService,
              private toastr: ToastrService) {}

  ngOnInit(): void
  {
    this.getEleveStages();
  }

  getEleveStages(): void
  {
    let data = {};
    let idEleve = this.auth.id;
    let response = this.service.sendGetMessageQuery("stages/eleves/"+idEleve, data);
    response.subscribe(
      r => {this.recupererStages(r);},
      error => {console.log(error);}
    );
  }

  getCurrentEleveStages(annee1: number): void
  {
    let data = {annee: annee1, endID: this.auth.id};
    let response = this.service.sendGetMessageQuery("stages/eleve/stage", data);
    response.subscribe(
      r => {this.recupererStages(r);},
      error => {console.log(error);}
    );
  }

  recupererStages(data: any): void
  {
    this.stages = data;
  }

  AjouterStage(): void {
      this.router.navigate(['/form-stage']) ;
  }
}
