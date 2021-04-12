import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.scss']
})
export class EnteteComponent implements OnInit {

  nom_utilisateur : string | undefined ;
  prenom_utilisateur : string | undefined ;
  admin : boolean | undefined ;
  connected: boolean | undefined ;

  displayAccueil: boolean = false;
  displayAdministration: boolean = false;
  displayAjoutStage: boolean = false;
  displayRechercheStage: boolean = false;
  displayStatistiques: boolean = false;

  constructor(private authservice: AuthService, private router: Router) {
    this.router.events.subscribe((ev) => {
      this.connected = this.authservice.isAuthenticated() ;
      if(this.connected){
        this.nom_utilisateur = this.authservice.nom ;
        this.prenom_utilisateur = this.authservice.prenom;
        this.admin = this.authservice.admin ;
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

  ngOnInit(): void {}

  deconnexion() : void {
    this.authservice.logout() ;
    this.router.navigateByUrl("/").then() ;
  }


}
