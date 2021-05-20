import { Component, OnInit  } from '@angular/core';
import {DatePipe} from '@angular/common' ;
import {AuthService} from "../auth/auth.service";
import {MessageService} from "../message/message.service";
import {FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ModifStageService} from "../modifStage/modif-stage.service";

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
  StageModif = this.modifservice.StageToEdit ;
  TuteurModif = this.modifservice.Tuteur ;
  identreprise = new FormControl(this.StageModif?.identreprise, Validators.required) ;
  mailtuteur = new FormControl(this.TuteurModif?.emailtuteur,[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]) ;
  mailstage = new FormControl(this.StageModif?.adremailstage,[
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]) ;

  formulaire = this.formbuilder.group({
    idenseignant : this.StageModif?.idens,
    nomtuteur : this.TuteurModif?.nom,
    prenomtuteur : this.TuteurModif?.prenom,
    emailtuteur : this.mailtuteur,
    IdEntreprise : this.identreprise,
    adresseentreprise : this.StageModif?.adressestage,
    titrestage : new FormControl(this.StageModif?.titrestage, Validators.required),
    descriptionstage : new FormControl(this.StageModif?.description, Validators.required),
    emailstage : this.mailstage ,
    debutstage : new FormControl(new Date(this.StageModif?.datedebut), Validators.required),
    finstage : new FormControl(new Date(this.StageModif?.datefin), Validators.required),
    ville : new FormControl(this.StageModif?.Ville, Validators.required),
    pays : new FormControl(this.StageModif?.Pays, Validators.required)

  });


  constructor(private authservice: AuthService,private messageservice: MessageService,
              private formbuilder: FormBuilder,private toastr: ToastrService, private router: Router , private modifservice : ModifStageService) { }

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
      this.modifservice.cleanStage() ;

    }

  }

  enregistrerInfos(): void {
    let Debut = new DatePipe('en-US').transform( this.formulaire.value.debutstage,'YYYY-MM-d') ;
    let Fin = new DatePipe('en-US').transform( this.formulaire.value.finstage,'YYYY-MM-d') ;
    const StageInfos = {
      idEleve: this.authservice.id ,
      nometu: this.etudiant.nom,
      prenometu: this.etudiant.prenom,
      annee: this.etudiant.annee,
      niveau: this.niveau,
      idenseignant: this.formulaire.value.idenseignant,
      idtuteur: this.TuteurModif?.idtuteur,
      nomtuteur: this.formulaire.value.nomtuteur,
      prenomtuteur: this.formulaire.value.prenomtuteur,
      emailtuteur: this.formulaire.value.emailtuteur,
      identreprise: this.formulaire.value.IdEntreprise,
      adresseentreprise: this.formulaire.value.adresseentreprise,
      titrestage: this.formulaire.value.titrestage,
      descriptionstage: this.formulaire.value.descriptionstage,
      emailstage: this.formulaire.value.emailstage,
      debutstage: Debut,
      finstage: Fin,
      ville: this.formulaire.value.ville,
      pays: this.formulaire.value.pays
    };

    if (this.StageModif && this.TuteurModif){
      this.modifierStage(StageInfos) ;
    }else {
      this.ajouterStage(StageInfos) ;
    }
  }

 // à mettre dans la pull request bugs dans le backend pour les réponses http voir les conditions d'envoi de la réponse http si ça revient
  ajouterStage(nouvStage : any): void {

    if (this.verifFormulaire()){

      this.messageservice.sendMessage('forms/eleve', nouvStage).subscribe(response => {
        console.log(response) ;
        this.toastr.success('Le stage a bien été créé') ;
        this.router.navigateByUrl("/eleve").then(r => { console.log(r) ;}) ;
      }, error => {
        console.log(error);
        this.toastr.error('Une erreur s\'est produite') ;
      })

    }

  }

  verifTuteur(): boolean {
    if (this.formulaire.value.nomtuteur  && this.formulaire.value.prenomtuteur && this.formulaire.value.emailtuteur && this.TuteurModif){
      return this.formulaire.value.nomtuteur !== '' && this.formulaire.value.prenomtuteur !== '' && this.formulaire.value.emailtuteur !== '';
    }else {
      return false ;
    }


  }

  modifierStage(StageEdit : any) :void {
    if (this.verifFormulaire()){

      if (this.verifTuteur()){
        this.messageservice.sendPutMessage('stages/'+this.StageModif.idstage,StageEdit) .subscribe(res =>{
          this.toastr.success("Le stage a bien été modifié") ;
          this.router.navigateByUrl("/eleve").then(r => { console.log(r) ;}) ;
        } , error => {
          console.log(error);
          this.toastr.error('Une erreur s\'est produite') ;
        }) ;
      }else {
        this.toastr.error('Remplissez tous les champs du tuteur entreprise') ;
      }
    }
  }

  onCreateEntreprise() : void {
    //dans le cas ou deux étudiants créé un stage pour la même entreprise à qlq instants d'écart
    this.messageservice.sendGetMessageQuery('entreprises/',{}).subscribe(
      response=>{ this.entreprises = response as unknown as any[] ;}
    )
  }

  verifFormulaire(): boolean {
    let donneesManquantes = false ;
    let mailInvalide = false ;
    Object.keys(this.formulaire.controls).forEach(key =>{
      // @ts-ignore
      if (this.formulaire.get(key).errors){
        // @ts-ignore
        const erreursvalidation : ValidationErrors = this.formulaire.get(key).errors ;
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

    return(!donneesManquantes && !mailInvalide) ;
  }
}
