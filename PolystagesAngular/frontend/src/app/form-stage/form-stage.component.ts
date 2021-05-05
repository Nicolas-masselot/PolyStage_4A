import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MessageService} from "../message/message.service";
import {Data} from "../message/message.service";

@Component({
  selector: 'app-form-stage',
  templateUrl: './form-stage.component.html',
  styleUrls: ['./form-stage.component.scss']
})


export class FormStageComponent implements OnInit {

  Role: string | undefined ;
  annee: string | undefined ;
  enseignants: any[] | undefined ;
  entreprises: any[] | undefined ;
  constructor(private authservice: AuthService,private messageservice: MessageService) { }

  ngOnInit(): void {
    if (this.authservice.authAs == 'eleve'){
      this.Role = this.authservice.authAs ;
      this.messageservice.sendGetMessagebyID('eleves/',this.authservice.IdUtilisateur).subscribe(
        response=> { // @ts-ignore
          this.annee = response[0].niveau ; }
      )

      this.messageservice.sendGetMessageQuery('enseignants/',{}).subscribe(
        response=>{this.enseignants = response as unknown as any[] ; }
      )

      this.messageservice.sendGetMessageQuery('entreprises/',{}).subscribe(
        response=>{ this.entreprises = response as unknown as any[] ;}
      )
    }

  }

  // TODO modal pour entreprises
  // TODO submit du formulaire
}
