import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  displayAccueil: boolean = false;
  displayAdministration: boolean = false;
  displayAjoutStage: boolean = false;
  displayRechercheStage: boolean = false;
  displayStatistiques: boolean = false;

  constructor(private authservice: AuthService, private router: Router)
  {
    this.router.events.subscribe((ev) => {

      if (this.authservice.isAuthenticated()){
        this.displayAccueil = true;
        if (this.authservice.admin) this.displayAdministration = true;
        if (this.authservice.admin) this.displayAjoutStage = true;
        if (this.authservice.admin) this.displayRechercheStage = true;
        if (this.authservice.admin) this.displayStatistiques = true;
      } else {
        this.displayAccueil = false;
        this.displayAdministration = false;
        this.displayAjoutStage = false;
        this.displayRechercheStage = false;
        this.displayStatistiques = false;
      }
    });

  }

  ngOnInit(): void
  {}

}
