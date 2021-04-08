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

  constructor(@Inject(MessageService) private service: MessageService)
  {}

  sendAuthentication(login: string, password: string): Observable<any>
  {
    let data = {username: login, password: sha512.create().update(password).hex()}; // TODO : sha512 le mot de passe
    let response = this.service.sendGetMessageQuery("authentification", data);
    response.subscribe(
      r => {this.finalizeAuthentication(r);}
    );
    return response;
  }

  finalizeAuthentication(message: any): void
  {
    if (message[0] != undefined)
    {
      this.authenticated = true;

      this.authAs = message[0]["role"];
      this.nom = message[0]["nom"];
      this.prenom = message[0]["prenom"];
    }
    else
    {
      this.authenticated = false;
    }
  }

  isAuthenticated(): boolean
  {
    return this.authenticated;
  }

}
