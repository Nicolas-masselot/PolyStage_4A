import { Component, OnInit } from '@angular/core';
import {Retard} from "../dataTemplate/Retard";
import {Stage} from "../dataTemplate/Stage";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  retard: Retard = {"nom": "", "prenom": ""};

  constructor(private service: AuthService) { }

  ngOnInit(): void
  {

  }

}
