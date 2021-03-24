import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.nom_utilisateur = "insérer un nom ici" ;
    this.prenom_utilisateur = "insérer un prénom ici" ; // initialiser si l'utilisateur est connecté
    this.admin = false ;
    this.connected = true ;
  }

  deconnexion() : void {
    console.log("déconnexion") ;
  }

  afficher_menu() : void {
    console.log("affichage menu") ;
  }

}
