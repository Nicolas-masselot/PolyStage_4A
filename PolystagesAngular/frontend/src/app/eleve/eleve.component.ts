import { Component, OnInit } from '@angular/core';
import {StageEleve} from "../dataTemplate/StageEleve";
import {Router} from "@angular/router";

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss']
})
export class EleveComponent implements OnInit {

  currentStage: StageEleve[] = [];
  stage: StageEleve = {"idstage": 0, "annee": "", "niveau": 0, "titrestage": "", "nomcomplet": "", "description": "", "cheminrapport": "", "cheminpres": "", "datedebut": "", "datefin": ""};

  myRandomImg: string = "0"; // 0-10

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  AjouterStage(): void {
      this.router.navigate(['/form-stage']) ;
  }
}
