import {Component, ElementRef, OnInit} from '@angular/core';
import {StageAjout} from "../dataTemplate/StageAjout";
import {Stage} from "../dataTemplate/Stage";
import {AuthService} from "../auth/auth.service";
import {MessageService} from "../message/message.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

declare var $: any;

@Component({
  selector: 'app-ajouter-stage',
  templateUrl: './ajouter-stage.component.html',
  styleUrls: ['./ajouter-stage.component.scss']
})
export class AjouterStageComponent implements OnInit {

  listStages: any[] = [];
  fileList: any[] = [];
  currentItem = {};

  constructor(private service: MessageService,
              private auth: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private elementRef: ElementRef)
  {}

  ngOnInit(): void
  {}

  onFileChange(event: any): void
  {
    this.fileList = event.target.files;
  }

  loadStagesFromCsv(): void
  {
    let data = {data: this.fileList[0].name};
    let response = this.service.sendMessage("convertStagesCsvToJson", data);
    response.subscribe(
      r => {
        //console.log(this.listStages);
        this.toastr.success('Les stages sont récupérés avec succés ');
      },
      error => {
        this.toastr.error('Les stages ne sont pas récupérés suite à un problème ');
      }
    );
  }

  setStagesData(): void
  {
    // get id entreprise avec son nom
    this.listStages.forEach(element => {
      let data = {entrepriseName: element.Raisonsociale};
      let response = this.service.sendGetMessageQuery("entreprises/ByName/"+element.Raisonsociale, data);
      response.subscribe(
        r => {
          element.identreprise = r.data[0].identreprise;
        },
        error => {}
      );
    });

    // get id etudiant by nom et prénom
    this.listStages.forEach(element => {
      let data = {nom: element.Nomdeleleve, prenom: element.Prenomdeleleve};
      let response = this.service.sendGetMessageQuery("elevesId/byNomAndPrenom", data);
      response.subscribe(
        r => {
          element.ideleve = r.data[0].ideleve;
        },
        error => {}
      );
    });

    // get id enseignant by nom et prénom
    this.listStages.forEach(element => {
      let data = {nom: element.Nomenseignantencadrant, prenom: element.Prenomenseignantencadrant};
      let response = this.service.sendGetMessageQuery("enseignantsId/ByNomPrenom", data);
      response.subscribe(
        r => {
          console.log(r);
          element.idens = r.data[0].idens;
        },
        error => {}
      );
    });

    // get id tuteur by nom et prénom
    this.listStages.forEach(element => {
      let data = {nom:element.NomduTuteurdestagedanslentreprise, prenom:element.PrenomduTuteurdestagedanslentreprise};
      let response = this.service.sendGetMessageQuery("tuteurId/byNomAndPrenom", data);
      response.subscribe(
        r => {
          element.idtuteur = r.data[0].idtuteur;
        },
        error => {}
      );
    });
  }

  init(item: any): void
  {
    let Sujetdustage: any = document.getElementById("Sujetdustage");
    Sujetdustage.value = item.Sujetdustage
    let Raisonsociale: any = document.getElementById("Raisonsociale");
    Raisonsociale.value = item.Raisonsociale;
    let VilledeStage: any = document.getElementById("VilledeStage");
    VilledeStage.value = item.VilledeStage;
    let PaysdeStage: any = document.getElementById("PaysdeStage");
    PaysdeStage.value = item.PaysdeStage;
    let Datededebut: any = document.getElementById("Datededebut");
    Datededebut.value = item.Datededebut;
    let Datedefin: any = document.getElementById("Datedefin");
    Datedefin.value = item.Datedefin;

    let Nomdeleleve: any = document.getElementById("NomEtudiant");
    Nomdeleleve.value = item.Nomdeleleve;

    let Prenomdeleleve: any = document.getElementById("PrenomEtudiant");
    Prenomdeleleve.value = item.Prenomdeleleve;

    let NomduTuteurdestagedanslentreprise: any = document.getElementById("NomduTuteurDesStagesDansLentreprise");
    NomduTuteurdestagedanslentreprise.value = item.NomduTuteurdestagedanslentreprise;

    let PrenomduTuteurdestagedanslentreprise: any = document.getElementById("PrenomduTuteurDesStagesDansLentreprise");
    PrenomduTuteurdestagedanslentreprise.value = item.PrenomduTuteurdestagedanslentreprise;

    let MailTuteurDesStageDansLentreprise: any = document.getElementById("MailTuteurDesStageDansLentreprise");
    MailTuteurDesStageDansLentreprise.value = item.MailTuteurdestagedanslentreprise;

    let Adressedustage: any = document.getElementById("Adressedustage");
    Adressedustage.value = item.Adressedustage;

    let Prenomenseignantencadrant: any = document.getElementById("Prenomenseignantencadrant");
    Prenomenseignantencadrant.value = item.Prenomenseignantencadrant;

    let Nomenseignantencadrant: any = document.getElementById("Nomenseignantencadrant");
    Nomenseignantencadrant.value = item.Nomenseignantencadrant;

    // le stage à modifier
    this.currentItem = item;
    //console.log(currentItem)
  }

  SaveModifications(): void
  {
    let Sujetdustage = (<HTMLInputElement>document.getElementById("Sujetdustage")!).value;
    let Raisonsociale = (<HTMLInputElement>document.getElementById("Raisonsociale")!).value;
    let VilledeStage = (<HTMLInputElement>document.getElementById("VilledeStage")!).value;
    let PaysdeStage = (<HTMLInputElement>document.getElementById("PaysdeStage")!).value;
    let Datededebut = (<HTMLInputElement>document.getElementById("Datededebut")!).value;
    let Datedefin = (<HTMLInputElement>document.getElementById("Datedefin")!).value;
    let Prenomdeleleve = (<HTMLInputElement>document.getElementById("PrenomEtudiant")!).value;
    let Nomdeleleve = (<HTMLInputElement>document.getElementById("NomEtudiant")!).value;
    let NomduTuteurdestagedanslentreprise = (<HTMLInputElement>document.getElementById("NomduTuteurDesStagesDansLentreprise")!).value;
    let PrenomduTuteurdestagedanslentreprise = (<HTMLInputElement>document.getElementById("PrenomduTuteurDesStagesDansLentreprise")!).value;
    let MailTuteurDesStageDansLentreprise = (<HTMLInputElement>document.getElementById("MailTuteurDesStageDansLentreprise")!).value;
    let Adressedustage = (<HTMLInputElement>document.getElementById("Adressedustage")!).value;
    let Prenomenseignantencadrant = (<HTMLInputElement>document.getElementById("Prenomenseignantencadrant")!).value;
    let Nomenseignantencadrant = (<HTMLInputElement>document.getElementById("Nomenseignantencadrant")!).value;

    let newItem: any = this.currentItem;
    // mettre a jour le stage avec les nouvelles informations
    newItem.Sujetdustage = Sujetdustage;
    newItem.Raisonsociale = Raisonsociale;
    newItem.VilledeStage = VilledeStage;
    newItem.PaysdeStage = PaysdeStage;
    newItem.Datededebut = Datededebut;
    newItem.Datedefin = Datedefin;
    newItem.MailTuteurdestagedanslentreprise = MailTuteurDesStageDansLentreprise;
    newItem.NomduTuteurdestagedanslentreprise = NomduTuteurdestagedanslentreprise;
    newItem.PrenomduTuteurdestagedanslentreprise = PrenomduTuteurdestagedanslentreprise;
    newItem.Prenomenseignantencadrant = Prenomenseignantencadrant;
    newItem.Nomenseignantencadrant = Nomenseignantencadrant;
    newItem.Prenomdeleleve = Prenomdeleleve;
    newItem.Nomdeleleve = Nomdeleleve;
    newItem.Adressedustage = Adressedustage;

    console.log(newItem);
    let indexItem = this.listStages.indexOf(this.currentItem);
    this.listStages[indexItem] = newItem;

    this.toastr.success('Données du stage modifiées avec succés');
    $('#modifyModal').modal('hide')
  }

  cancelSave(): void
  {
    location.reload();
  }

  saveStages(): void
  {
    this.listStages.forEach(element => {

      let data = {element};
      let response = this.service.sendMessage("forms/eleve/csv", data);
      response.subscribe(
        r => {
          this.toastr.success('Les stages sont enregistrés avec succés');
        },
        error => {
          this.toastr.error('Erreur, Les données du stage(s) ne sont pas enregistrées');
        }
      );

    })
    $('#saveModal').modal('hide');
  }

}
