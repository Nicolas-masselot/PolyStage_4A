import {Inject, Injectable} from '@angular/core';
import {Data, MessageService} from "../message/message.service";
import {Observable} from "rxjs";
import {sha512} from "js-sha512";

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  private authenticated: boolean = false;
  private authAs: string = ""; // eleve, enseignant ou tuteur
  private prenom: string = "";
  private nom: string = "";
  private admin: boolean = false;
  private id: number = 0;

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
    sessionStorage.setItem('isConnected', String(this.authenticated)) ;
    sessionStorage.setItem('prenom', this.prenom) ;
    sessionStorage.setItem('nom', this.nom) ;
    sessionStorage.setItem('role', this.authAs) ;
    sessionStorage.setItem('admin',String(this.admin)) ;


    if (this.authAs == "eleve") this.id = message[0]["ideleve"];
    else if (this.authAs == "enseignant") this.id = message[0]["idens"];
    else if (this.authAs == "tuteur") this.id = message[0]["idtuteur"];

    sessionStorage.setItem('idUser',String(this.id)) ;
  }

  isAuthenticated(): boolean
  {
    return (sessionStorage.getItem('isConnected')== "true") ;
  }

  getId():string | null {
    if (sessionStorage.getItem('idUser')&& sessionStorage.getItem('idUser') !== 'undefined') {
      return <string>sessionStorage.getItem('idUser');
    } else {
      return null;
    }
  }

  getRole():string | null
  {
    if (sessionStorage.getItem('role')&& sessionStorage.getItem('role') !== 'undefined'){
      return <string>sessionStorage.getItem('role') ;
    }else {
      return null ;
    }

  }

  getNom() : string | null
  {
    if (sessionStorage.getItem('nom') && sessionStorage.getItem('nom') !== 'undefined'){
      return <string>sessionStorage.getItem('nom') ;
    } else {
      return  null ;
    }
  }

  getPrenom() : string | null
  {
    if (sessionStorage.getItem('prenom') && sessionStorage.getItem('prenom') !== 'undefined'){
      return <string>sessionStorage.getItem('prenom') ;
    } else {
      return  null ;
    }
  }

  getAdmin() : string | null
  {
    if (sessionStorage.getItem('admin')&& sessionStorage.getItem('admin') !== 'undefined'){
      return <string>sessionStorage.getItem('admin') ;
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

    sessionStorage.clear() ;
  }

}
