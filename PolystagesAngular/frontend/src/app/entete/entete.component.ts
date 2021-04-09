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

  constructor(private authservice: AuthService, private router: Router) {
    this.router.events.subscribe((ev) => {
      this.connected = this.authservice.isAuthenticated() ;
      if(this.connected){
        this.nom_utilisateur = this.authservice.nom ;
        this.prenom_utilisateur = this.authservice.prenom;
        this.admin = this.authservice.admin ;
      }
    });
  }

  ngOnInit(): void {}

  deconnexion() : void {
    this.authservice.logout() ;
    this.router.navigateByUrl("/") ;
  }

  afficher_menu() : void {
    console.log("affichage menu") ;
  }

}
