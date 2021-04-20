import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {

  constructor(private service: AuthService) { }

  ngOnInit(): void {
  }

}
