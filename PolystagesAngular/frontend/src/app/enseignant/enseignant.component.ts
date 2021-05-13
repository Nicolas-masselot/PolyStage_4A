import { Component, OnInit } from '@angular/core';
import {MessageService} from "../message/message.service";
import {AuthService} from "../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss']
})
export class EnseignantComponent implements OnInit {

  stages: any[] = [];

  constructor(private service: MessageService,
              private auth: AuthService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void
  {
    this.getEnsStages();
  }

  getEnsStages(): void
  {
    let data = {};
    let idEns = this.auth.id;
    let response = this.service.sendGetMessageQuery("stages/ens/"+idEns, data);
    response.subscribe(
      r => {this.recupererStages(r);},
      error => {console.log(error);}
    );
  }

  getCurrentEnsStages(annee1: number): void
  {
    let data = {annee: annee1, endID: this.auth.id};
    let response = this.service.sendGetMessageQuery("stages/ens/stage", data);
    response.subscribe(
      r => {this.recupererStages(r);},
      error => {console.log(error);}
    );
  }

  recupererStages(data: any): void
  {
    this.stages = data;
  }

  lancerEvaluation(): void
  {
    // TODO
  }

  lancerAllEvaluation(): void
  {
    // TODO
  }

  goToEval(chemin: string): void
  {
    this.router.navigateByUrl(chemin);
  }

}
