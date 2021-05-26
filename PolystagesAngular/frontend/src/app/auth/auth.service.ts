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
  id: number = 0;

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
    localStorage.setItem('isConnected', String(this.authenticated)) ;
    localStorage.setItem('prenom', this.prenom) ;
    localStorage.setItem('nom', this.nom) ;
    localStorage.setItem('role', this.authAs) ;
    localStorage.setItem('admin',String(this.admin)) ;


    if (this.authAs == "eleve") this.id = message[0]["ideleve"];
    else if (this.authAs == "enseignant") this.id = message[0]["idens"];
    else if (this.authAs == "tuteur") this.id = message[0]["idtuteur"];

    localStorage.setItem('idUser',String(this.id)) ;
  }

  isAuthenticated(): boolean
  {
    return (localStorage.getItem('isConnected')== "true") ;
  }

  getId():string | null {
    if (localStorage.getItem('idUser')&& localStorage.getItem('idUser') !== 'undefined') {
      return <string>localStorage.getItem('idUser');
    } else {
      return null;
    }
  }

  getRole():string | null
  {
    if (localStorage.getItem('role')&& localStorage.getItem('role') !== 'undefined'){
      return <string>localStorage.getItem('role') ;
    }else {
      return null ;
    }

  }

  getNom() : string | null
  {
    if (localStorage.getItem('nom') && localStorage.getItem('nom') !== 'undefined'){
      return <string>localStorage.getItem('nom') ;
    } else {
      return  null ;
    }
  }

  getPrenom() : string | null
  {
    if (localStorage.getItem('prenom') && localStorage.getItem('prenom') !== 'undefined'){
      return <string>localStorage.getItem('prenom') ;
    } else {
      return  null ;
    }
  }

  getAdmin() : string | null
  {
    if (localStorage.getItem('admin')&& localStorage.getItem('admin') !== 'undefined'){
      return <string>localStorage.getItem('admin') ;
    } else {
      return  null ;
    }
  }

  logout():void{
    this.authenticated = false;

    this.authAs =  '';
    this.nom = '';
    this.prenom = '';
    this.admin = false;

    localStorage.clear() ;
  }

}
