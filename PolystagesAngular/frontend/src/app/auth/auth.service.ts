import {Inject, Injectable} from '@angular/core';
import {Data, MessageService} from "../message/message.service";
import {Observable} from "rxjs";
import {sha512} from "js-sha512";

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

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
  }

  keepAuthenticated(): Observable<any>
  {
    let data = {username: "nicolas.baudru@univ-amu.fr", password: sha512.create().update("prof").hex()};
    let response = this.service.sendGetMessageQuery("authentification", data);
    response.subscribe(
      r => {this.finalizeAuthentication(r);},
      error => {this.authenticated = false;}
    );
    return response;
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
