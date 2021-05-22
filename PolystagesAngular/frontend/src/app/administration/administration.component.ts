import { Component, OnInit } from '@angular/core';
import {Retard} from "../dataTemplate/Retard";
import {Stage} from "../dataTemplate/Stage";
import {AuthService} from "../auth/auth.service";
import {MessageService} from "../message/message.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  retardsTuteurs: any[] = [];
  retardsEleves: any[] = [];

  constructor(private service: MessageService,
              private auth: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void
  {

  }

  getRetards(): void
  {
    let data = {};
    let response = this.service.sendGetMessageQuery("eleves/retard", data);
    response.subscribe(
      r => {this.recupererRetardsEleves(r);},
      error => {console.log(error);}
    );

    response = this.service.sendGetMessageQuery("tuteurs/retard", data);
    response.subscribe(
      r => {this.recupererRetardsTuteurs(r);},
      error => {console.log(error);}
    );
  }

  recupererRetardsEleves(data: any): void
  {
    this.retardsEleves = data;
  }

  recupererRetardsTuteurs(data: any): void
  {
    this.retardsTuteurs = data;
  }

  sendMails(): void
  {
    let data = {retardsTuteurs: this.retardsTuteurs, retardsEleves: this.retardsEleves};
    let response = this.service.sendMessage("mail/rappel", data);
    response.subscribe(
      r =>
        {
          this.toastr.success("Les mails ont bien été envoyés")
          this.getRetards();
        },
      error => {console.log(error);}
    );
  }

}
