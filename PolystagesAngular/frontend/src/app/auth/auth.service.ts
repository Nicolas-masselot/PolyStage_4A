import {Inject, Injectable} from '@angular/core';
import {Data, MessageService} from "../message/message.service";
import {Observable} from "rxjs";

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
    let data = {login: login, password: password};
    let response = this.service.sendMessage("checkLogin", data)
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
      // TODO : set authAs :
      // this.authAs = message["message"];
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
