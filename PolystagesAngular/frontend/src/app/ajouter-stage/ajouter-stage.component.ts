import { Component, OnInit } from '@angular/core';
import {StageAjout} from "../dataTemplate/StageAjout";
import {Stage} from "../dataTemplate/Stage";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-ajouter-stage',
  templateUrl: './ajouter-stage.component.html',
  styleUrls: ['./ajouter-stage.component.scss']
})
export class AjouterStageComponent implements OnInit {

  stage: StageAjout = {"Sujetdustage": "", "Nomdeleleve": "", "Prenomdeleleve": "", "Raisonsociale": "", "VilledeStage": "", "PaysdeStage": "", "Datededebut": "", "Datedefin": ""};

  constructor(private service: AuthService) { }

  ngOnInit(): void {
  }

}
