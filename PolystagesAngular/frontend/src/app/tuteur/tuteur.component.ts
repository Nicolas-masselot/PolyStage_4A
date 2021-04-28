import { Component, OnInit } from '@angular/core';
import {Stage} from "../dataTemplate/Stage";

@Component({
  selector: 'app-tuteur',
  templateUrl: './tuteur.component.html',
  styleUrls: ['./tuteur.component.scss']
})
export class TuteurComponent implements OnInit {

  stages: Stage[] = [];
  stage: Stage = {"nom": "", "prenom": "", "titrestage": "", "nomcomplet": "", "chemineval": "", "chemincomp": "", "datedebut": "", "datefin": ""};

  constructor() { }

  ngOnInit(): void {
  }

}
