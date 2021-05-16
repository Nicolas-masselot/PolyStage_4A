import { Component, OnInit  } from '@angular/core';
import {DatePipe} from '@angular/common' ;
import {AuthService} from "../auth/auth.service";
import {MessageService} from "../message/message.service";
import {FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-stage',
  templateUrl: './form-stage.component.html',
  styleUrls: ['./form-stage.component.scss']
})

export class FormStageComponent implements OnInit {

  Role: string | undefined ;
  niveau: string | undefined ;
  enseignants: any[] | undefined ;
  entreprises: any[] | undefined ;
  etudiant: any;
  identreprise = new FormControl(undefined, Validators.required) ;
  mailtuteur = new FormControl(undefined,[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]) ;
  mailstage = new FormControl(undefined,[
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]) ;

  formulaireAjout = this.formbuilder.group({
    idenseignant : undefined,
    nomtuteur : undefined,
    prenomtuteur : undefined,
    emailtuteur : this.mailtuteur,
    IdEntreprise : this.identreprise,
    adresseentreprise : undefined,
    titrestage : new FormControl(undefined, Validators.required),
    descriptionstage : new FormControl(undefined, Validators.required),
    emailstage : this.mailstage ,
    debutstage : new FormControl(undefined, Validators.required),
    finstage : new FormControl(undefined, Validators.required),
    ville : new FormControl(undefined, Validators.required),
    pays : new FormControl(undefined, Validators.required)

  });


  constructor(private authservice: AuthService,private messageservice: MessageService,
              private formbuilder: FormBuilder,private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    if (this.authservice.authAs == 'eleve'){
      this.Role = this.authservice.authAs ;
      this.messageservice.sendGetMessagebyID('eleves/',this.authservice.id).subscribe(
        response=> { // @ts-ignore
          this.niveau = response[0].niveau ;
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

    let donneesManquantes = false ;
    let mailInvalide = false ;
    Object.keys(this.formulaireAjout.controls).forEach(key =>{
      // @ts-ignore
      if (this.formulaireAjout.get(key).errors){
        // @ts-ignore
        const erreursvalidation : ValidationErrors = this.formulaireAjout.get(key).errors ;
        if (erreursvalidation != null){
          Object.keys(erreursvalidation).forEach(keyError => {
            if (keyError == 'required'){
              donneesManquantes = true ;
            }else if (keyError == 'pattern'){
              mailInvalide = true ;
            }
          }) ;
        }
      }
    })

    if (donneesManquantes) {
      this.toastr.error("Veuillez remplir tous les champs obligatoires") ;
    }
    if (mailInvalide) {
      this.toastr.error("adresses emails invalides") ;
    }

    if (!donneesManquantes && !mailInvalide){
      let Debut = new DatePipe('en-US').transform( this.formulaireAjout.value.debutstage,'YYYY-MM-d') ;
      let Fin = new DatePipe('en-US').transform( this.formulaireAjout.value.finstage,'YYYY-MM-d') ;
      const nouvStage = {
        idEleve: this.authservice.id ,
        nometu: this.etudiant.nom,
        prenometu: this.etudiant.prenom,
        annee: this.etudiant.annee,
        niveau: this.niveau,
        idenseignant: this.formulaireAjout.value.idenseignant,
        nomtuteur: this.formulaireAjout.value.nomtuteur,
        prenomtuteur: this.formulaireAjout.value.prenomtuteur,
        emailtuteur: this.formulaireAjout.value.emailtuteur,
        identreprise: this.formulaireAjout.value.IdEntreprise,
        adresseentreprise: this.formulaireAjout.value.adresseentreprise,
        titrestage: this.formulaireAjout.value.titrestage,
        descriptionstage: this.formulaireAjout.value.descriptionstage,
        emailstage: this.formulaireAjout.value.emailstage,
        debutstage: Debut,
        finstage: Fin,
        ville: this.formulaireAjout.value.ville,
        pays: this.formulaireAjout.value.pays
      };

      this.messageservice.sendMessage('forms/eleve', nouvStage).toPromise().then(response => {
        console.log(response) ;
        this.toastr.success('Le stage a bien été créé') ;
        this.router.navigateByUrl("/eleve").then(r => {}) ;
      } , error => {
        console.log(error);
        this.toastr.error('Une erreur s\'est produite') ;
      }) ;

    }

  }

  onCreateEntreprise() : void {
    //dans le cas ou deux étudiants créé un stage pour la même entreprise à qlq instants d'écart
    this.messageservice.sendGetMessageQuery('entreprises/',{}).subscribe(
      response=>{ this.entreprises = response as unknown as any[] ;}
    )
  }
}
