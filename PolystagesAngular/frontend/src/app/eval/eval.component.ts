import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../message/message.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.scss']
})
export class EvalComponent implements OnInit {

  idStage : number | undefined;
  stage : any | undefined ;

  choixOuiNon: string[] = ["Oui", "Non"] ;
  choixContrat: string[] = ["CDD", "CDI", "Prolongation de stage", "Contrat de thèse en entreprise", "VIE"] ;
  choixClassement: string[] = ["Parmi les meilleurs", "Au dessus de la moyenne", "À la moyenne", "En dessous de la moyenne", "Parmi les plus mauvais"] ;
  choixNotation: string[] = ["Très bien", "Bien", "Moyen", "Insuffisant", "Sans objet"] ;


  FormEval = this.fb.group({});

  fields = {
    annee: undefined,
    niveau: undefined,
    nom: undefined,
    prenom: undefined,
    idtuteur: undefined,
    idens: undefined,
    datetime: undefined
  } ;

  questions : any ;
  constructor(private route: ActivatedRoute, private message : MessageService, private auth: AuthService, private fb: FormBuilder,
              private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.idStage = Number(this.route.snapshot.paramMap.get('stageId')) ;
    this.message.sendGetMessagebyID('stages/eval/',this.idStage).subscribe( reponse => {
      // @ts-ignore
      this.stage = reponse[0] ;
    }) ;

    this.message.sendGetMessageQuery('recupQuestions',null).subscribe( reponse => {
      this.questions =reponse ;

      // @ts-ignore
      this.fields[2] = this.stage.nom ;
      // @ts-ignore
      this.fields[3] = this.stage.prenom ;
      // @ts-ignore
      this.fields[4] = this.stage.nomcomplet ;

      // @ts-ignore
      this.fields[6] = this.auth.getPrenom()+' '+this.auth.getNom() ;

      this.fields.annee = this.stage.annee ;
      this.fields.niveau = this.stage.niveau ;
      this.fields.nom = this.stage.nom ;
      this.fields.prenom = this.stage.prenom ;
      this.fields.idtuteur = this.stage.idtuteur ;
      this.fields.idens = this.stage.idens ;
      // @ts-ignore
      this.fields.datetime = Date.now() ;

      for (let categorie of this.questions) {
        for (let quest of categorie.questions){
            this.FormEval.addControl(quest.idquest,new FormControl()) ;
        }
      }

      this.FormEval.get('2')?.setValue(this.stage.nom) ;
      this.FormEval.get('3')?.setValue(this.stage.prenom) ;
      this.FormEval.get('4')?.setValue(this.stage.nomcomplet) ;
      this.FormEval.get('6')?.setValue(this.auth.getPrenom()+' '+this.auth.getNom()) ;


    }) ;

  }

  QuestionBonNiveau(niveau: any): boolean {
    if (niveau){
      return this.stage.niveau >= niveau ;
    }else {
      return true ;
    }
  }

  submitQuestionnaire() : void {

    Object.keys(this.FormEval.controls).forEach(key => {

      if (this.FormEval.controls[key].value !== null){
        // @ts-ignore
        this.fields[key] = this.FormEval.controls[key].value ;
      }

    });

    this.message.sendMessage('stages/eval/'+this.idStage,this.fields).subscribe( res => {
      this.router.navigateByUrl("/tuteur").then(r => { console.log(r) ;}) ;
      this.toastr.success("L'évaluation a bien été enregistrée") ;

    }, error => {
      console.log(error) ;
      this.toastr.error("Une erreur s'est produite") ;
    })
  }


}
