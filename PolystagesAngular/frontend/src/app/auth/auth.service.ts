import {Inject, Injectable} from '@angular/core';
import {Data, MessageService} from "../message/message.service";
import {Observable} from "rxjs";
import {sha512} from "js-sha512";

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  IdUtilisateur: number = 0 ;
  authenticated: boolean = false;
  authAs: string = ""; // eleve, enseignant ou tuteur
  prenom: string = "";
  nom: string = "";
  admin: boolean = false;

  constructor(@Inject(MessageService) private service: MessageService)
  {}

  sendAuthentication(login: string, password: string): Observable<any>
  {
    let data = {username: login, password: sha512.create().update(password).hex()};
    let response = this.service.sendGetMessageQuery("authentification", data);
    response.subscribe(
      r => {this.finalizeAuthentication(r);},
      error => {this.authenticated = false;}
    );
    return response;
  }

  finalizeAuthentication(message: any): void
  {
    this.authenticated = true;

    this.authAs = message[0]["role"];
    this.nom = message[0]["nom"];
    this.prenom = message[0]["prenom"];
    this.admin = message[0]["admin"] ;
    if (this.authAs == 'eleve'){
      this.IdUtilisateur = message[0]["ideleve"] ;
    }else if (this.authAs == 'tuteur'){
      this.IdUtilisateur = message[0]["idtuteur"] ;
    }else if (this.authAs == 'enseignant'){
      this.IdUtilisateur = message[0]["idens"] ;
    }
  }

  isAuthenticated(): boolean
  {
    return this.authenticated;
  }

  logout():void{
    this.authenticated = false;

    this.authAs =  '';
    this.nom = '';
    this.prenom = '';
    this.admin = false;
  }

}
