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

  constructor(@Inject(MessageService) private service: MessageService)
  {}

  sendAuthentication(login: string, password: string): Observable<Data>
  {
    let data = {username: login, password: sha512.create().update(password).hex()}; // TODO : sha512 le mot de passe
    let response = this.service.sendMessage("authentification", data)
    response.subscribe(
      r => {this.finalizeAuthentication(r);}
    );
    return response;
  }

  finalizeAuthentication(message: Data): void
  {
    if (message["status"] == "ok")
    {
      this.authenticated = true;
      this.authAs = message["data"]; // TODO : caller ça avec le backend
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
