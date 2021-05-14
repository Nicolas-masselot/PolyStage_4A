import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Data, MessageService} from "../message/message.service";
import { FormBuilder } from '@angular/forms';

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
  etudiant: any;

  formulaireAjout = this.formbuilder.group({
    idenseignant : '', // id valeur dans le select
    nomtuteur : '',
    prenomtuteur : '',
    emailtuteur : '',
    identreprise : '', // id valeur dans le select
    adresseentreprise : '',
    titrestage : '',
    descriptionstage : '',
    emailstage : '',
    debutstage : '',
    finstage : '',
    ville : '',
    pays : ''

  });

  constructor(private authservice: AuthService,private messageservice: MessageService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.authservice.authAs == 'eleve'){
      this.Role = this.authservice.authAs ;
      this.messageservice.sendGetMessagebyID('eleves/',this.authservice.id).subscribe(
        response=> { // @ts-ignore
          this.annee = response[0].niveau ;
          this.etudiant = response ;
        }
      )

      this.messageservice.sendGetMessageQuery('enseignants/',{}).subscribe(
        response=>{this.enseignants = response as unknown as any[] ; }
      )

      this.messageservice.sendGetMessageQuery('entreprises/',{}).subscribe(
        response=>{ this.entreprises = response as unknown as any[] ;}
      )
    }

  }

  ajouterStage(): void {
      console.log(this.formulaireAjout.value) ;
      this.formulaireAjout.reset() ;
  }

  //TODO refaire la page de 0 en recopiant les input uns par un les select sont normaux
}
