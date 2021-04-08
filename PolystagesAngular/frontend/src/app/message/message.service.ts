import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface Data
{
  status: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService implements Data
{
  status: string = "";
  data: any;

  constructor(private http : HttpClient) { }

  ngOnInit()
  {}

  sendMessage(url: string, data: any): Observable<Data>
  {
    let fullUrl : string = environment.baseUrl + url;

    //return fullUrl;
    return this.http.post<Data>
    (
      fullUrl,
      data,
      {withCredentials: true}
    );

  }

  sendGetMessagebyID(url: string, id_param: number): Observable<Data>
  {
    let fullUrl : string = environment.baseUrl + url + id_param;
    return this.http.get<Data>(
      fullUrl
    )
  }

  sendGetMessageQuery(url: string , data: any) : Observable<Data> {
    let fullUrl : string = environment.baseUrl + url;

    return this.http.get<Data>(
      fullUrl,
      { params: data }
    )
  }

// faire si besoin une fonction pour les requêtes put
}
