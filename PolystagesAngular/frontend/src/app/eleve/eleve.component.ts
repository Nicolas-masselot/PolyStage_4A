import { Component, OnInit } from '@angular/core';
import {StageEleve} from "../dataTemplate/StageEleve";
import {MessageService} from "../message/message.service";
import {AuthService} from "../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ModifStageService} from "../modifStage/modif-stage.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss']
})
export class EleveComponent implements OnInit {

  stages: any[] = [];

  currentStages: any[] = [] ;
  UrlBase : string = environment.baseUrl ;

  myRandomImg: string = "0"; // 0-10
  ImgRandoms: string[] = [] ;
  annee: number = 0  ;

  constructor(private service: MessageService,
              private auth: AuthService,
              private toastr: ToastrService,
              private router: Router,
              private editStage: ModifStageService) {}

  ngOnInit(): void
  {
    this.getEleveStages();
    this.service.sendGetMessagebyID('eleves/',this.auth.id).subscribe( res => {
      // @ts-ignore
      this.annee = res[0].annee ;
      this.getCurrentEleveStages(this.annee) ;
    })

  }

  randomImage() : string {
    let resultat = Math.floor(Math.random() * (10 + 1)) ;
    return  resultat.toString();
  }

  getEleveStages(): void
  {
    let data = {};
    let idEleve = this.auth.id;
    let response = this.service.sendGetMessageQuery("stages/eleves/"+idEleve, data);
    response.subscribe(
      r => {this.recupererStages(r);},
      error => {console.log(error);}
    );
  }

  getCurrentEleveStages(annee1: number): void
  {
    let data = {annee: annee1, eleveId: this.auth.id};
    let response = this.service.sendGetMessageQuery("current/eleve/stage", data);
    response.subscribe(
      r => {this.recupStagesCourants(r) ;},
      error => {console.log(error);}
    );
  }

  recupererStages(data: any): void
  {
    this.stages = data;
    for (let stage of this.stages) {
      this.ImgRandoms.push(this.randomImage()) ;
    }
  }

  recupStagesCourants(data: any): void
  {
    this.currentStages = data ;
  }

  AjouterStage(): void {
      this.router.navigate(['/form-stage']).then(() => {}) ;
  }

  async ModifierStage(Stage : any) : Promise<void> {
    await this.editStage.affecterStage(Stage) ;
    this.router.navigate(['/form-stage']).then(() => {}) ;
  }

  uploadRapport(event : any,idStage:number): void {
    let fichierRapport = event.target.files[0] ;
    if (fichierRapport.size > 5000000){
      this.toastr.error("Le fichier est trop grand (>5MO)") ;
    }else {
      let eleve ;
      this.service.sendGetMessagebyID('eleves/',this.auth.id).subscribe(
        response=> {
          // @ts-ignore
          eleve = response[0] ;
          let params = {
            type: 'rapport',
            annee: eleve.annee,
            niveau: eleve.niveau,
            nom: eleve.nom,
            prenom: eleve.prenom,
            idstage: idStage,
            mail: eleve.email
          };
          let formData:FormData = new FormData();
          formData.append('file', fichierRapport , fichierRapport.name);

          this.service.uploadFile(formData,params).subscribe(() => {
            this.toastr.success('Le rapport a bien été téléchargé') ;
            this.getEleveStages() ;
          }, error => {
            this.toastr.error("Le rapport n'a pas pu être téléchargé") ;
            console.log(error) ;
          }) ;

        }
      )

    }
  }

  uploadPresentation(event : any,idStage:number): void {
    let fichierPres = event.target.files[0] ;
    if (fichierPres.size > 10000000){
      this.toastr.error("Le fichier est trop grand (>10MO)") ;
    }else {
      let eleve ;
      this.service.sendGetMessagebyID('eleves/',this.auth.id).subscribe(
        response=> {
          // @ts-ignore
          eleve = response[0] ;
          let params = {
            type: 'presentation',
            annee: eleve.annee,
            niveau: eleve.niveau,
            nom: eleve.nom,
            prenom: eleve.prenom,
            idstage: idStage,
            mail: eleve.email
          };

          let formDataPres:FormData = new FormData();
          formDataPres.append('file', fichierPres , fichierPres.name);

          this.service.uploadFile(formDataPres,params).subscribe(() => {
            this.toastr.success('La présentation a bien été téléchargée') ;
            this.getEleveStages() ;
          }, error => {
            this.toastr.error("La présenation n'a pas pu être téléchargée") ;
            console.log(error) ;
          }) ;

        }
      )

    }
  }
}

// TODO faire l'affichage des stages selon le nombre et les images random
