import { Component, OnInit } from '@angular/core';
import {Stage} from "../dataTemplate/Stage";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message/message.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss']
})
export class EnseignantComponent implements OnInit {

  stages: Stage[] = [];
  stage: Stage = {"nom": "", "prenom": "", "titrestage": "", "nomcomplet": "", "chemineval": "", "chemincomp": "", "datedebut": "", "datefin": ""};

  constructor(private service: AuthService) {}

  ngOnInit(): void
  {

  }

}
