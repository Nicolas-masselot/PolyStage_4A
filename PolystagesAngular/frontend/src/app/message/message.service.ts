import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
}
