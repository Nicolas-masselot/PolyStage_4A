import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MessageService} from "../message/message.service";
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AjoutEntrepriseDialogComponent} from "../ajout-entreprise-dialog/ajout-entreprise-dialog.component";

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
  identreprise = new FormControl(undefined, Validators.required) ;

  formulaireAjout = this.formbuilder.group({
    idenseignant : undefined,
    nomtuteur : undefined,
    prenomtuteur : undefined,
    emailtuteur : undefined,
    IdEntreprise : this.identreprise,
    adresseentreprise : undefined,
    titrestage : new FormControl(undefined, Validators.required),
    descriptionstage : new FormControl(undefined, Validators.required),
    emailstage : new FormControl(undefined, Validators.required),
    debutstage : new FormControl(undefined, Validators.required),
    finstage : new FormControl(undefined, Validators.required),
    ville : new FormControl(undefined, Validators.required),
    pays : new FormControl(undefined, Validators.required)

  });


  constructor(private authservice: AuthService,private messageservice: MessageService, private formbuilder: FormBuilder ,public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.authservice.authAs == 'eleve'){
      this.Role = this.authservice.authAs ;
      this.messageservice.sendGetMessagebyID('eleves/',this.authservice.id).subscribe(
        response=> { // @ts-ignore
          this.annee = response[0].niveau ;
          // @ts-ignore
          this.etudiant = response[0] ;
        }
      )

      this.messageservice.sendGetMessageQuery('enseignants/',{}).subscribe(
        response=>{this.enseignants = response as unknown as any[] ;}
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

  OpenDialog(): void {
      const configDialog = new MatDialogConfig();

      configDialog.width = '60%' ;

      const dialogRef = this.dialog.open(AjoutEntrepriseDialogComponent,configDialog);

      dialogRef.afterClosed().subscribe(result => {
        console.log(result) ;
      })
  }


// TODO raccorder le formulaire au backend et corriger le menu
}
