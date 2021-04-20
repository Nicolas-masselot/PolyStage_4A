import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-rechercher-stage',
  templateUrl: './rechercher-stage.component.html',
  styleUrls: ['./rechercher-stage.component.scss']
})
export class RechercherStageComponent implements OnInit {

  constructor(private service: AuthService) { }

  ngOnInit(): void {
  }

}
