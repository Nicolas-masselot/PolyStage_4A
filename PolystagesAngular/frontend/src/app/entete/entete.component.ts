import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.scss']
})
export class EnteteComponent implements OnInit {

  nom_utilisateur : string | null | undefined ;
  prenom_utilisateur : string | null | undefined ;
  admin : string | null | undefined ;
  connected: boolean | undefined ;

  constructor(private authservice: AuthService, private router: Router) {
    this.router.events.subscribe((ev) => {
      this.connected = this.authservice.isAuthenticated() ;
      if(this.connected){
        this.nom_utilisateur = this.authservice.getNom() ;
        this.prenom_utilisateur = this.authservice.getPrenom();
        this.admin = this.authservice.getAdmin() ;
      } else {
      }
    });
  }

  ngOnInit(): void {}

  deconnexion() : void {
    this.authservice.logout() ;
    this.router.navigateByUrl("/").then() ;
  }


}
