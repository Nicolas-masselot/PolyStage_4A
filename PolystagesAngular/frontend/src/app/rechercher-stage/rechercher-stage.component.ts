import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MessageService} from "../message/message.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

declare var $: any;

@Component({
  selector: 'app-rechercher-stage',
  templateUrl: './rechercher-stage.component.html',
  styleUrls: ['./rechercher-stage.component.scss']
})
export class RechercherStageComponent implements OnInit {

  displayedColumns: string[] = ['idTable', 'titrestage', 'description', 'niveau', 'annee', 'modifier', 'supprimer'];
  stages: any[] = [];
  dataSource = new MatTableDataSource<any>(this.stages);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchValue: string = "";

  currentItem: any = {};
  DeleteStageItem: any = {};

  constructor(private service: MessageService,
              private auth: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void
  {
    this.getAllStages();
  }

  getAllStages(): void
  {
    let data = {};
    let response = this.service.sendGetMessageQuery("stages", data);
    response.subscribe(
      r => {
        this.recupererStages(r);
        this.dataSource.data = this.stages;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {}
    );
  }

  allStagesBySearchValue(): void
  {
    if (this.searchValue == "")
    {
      this.getAllStages();
    }
    else
    {
      let data = {val: this.searchValue};
      let response = this.service.sendGetMessageQuery("stages/byVal/" + this.searchValue, data);
      response.subscribe(
        r => {
          this.recupererStages(r);
          this.dataSource.data = this.stages;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
        }
      );
    }
  }

  recupererStages(data: any): void
  {
    let l = data.length
    for (let i = 0; i < l; i++)
    {
      data[i].idTable = i+1;
    }

    this.stages = data;
  }

  oneStageJsonToCsv(stage: any): void
  {
    let data = {data: stage};
    let response = this.service.sendMessage("convertOneStageJsonToCsv", data);
    response.subscribe(
      r => {
        this.toastr.success("Fichier téléchargé avec succés");
        window.open("http://localhost:8080/downloadFileStagesCSV", "_blank");
      },
      error => {
        this.toastr.error("Une erreur s'est produite, le fichier n'est pas téléchargé");
      }
    );
  }

  allStagesJsonToCsv(): void
  {
    let data = {data: this.stages};
    let response = this.service.sendMessage("convertAllStagesJsonToCsv", data);
    response.subscribe(
      r => {
        this.toastr.success("Fichier téléchargé avec succés");
        window.open("http://localhost:8080/downloadFileStagesCSV", "_blank");
      },
      error => {
        this.toastr.error("Une erreur s'est produite, le fichier n'est pas téléchargé");
      }
    );
  }

  initModify(stage: any): void
  {
    let item = stage;

    let titrestage = (<HTMLInputElement>document.getElementById("Sujetdustage")!);
    titrestage.value = item.titrestage;
    let description = (<HTMLInputElement>document.getElementById("Descriptiondustage")!);
    description.value = item.description;
    let nomentreprise = (<HTMLInputElement>document.getElementById("Raisonsociale")!);
    nomentreprise.value = item.nomentreprise;
    let VilledeStage = (<HTMLInputElement>document.getElementById("VilledeStage")!);
    VilledeStage.value = item.Ville;
    let PaysdeStage = (<HTMLInputElement>document.getElementById("PaysdeStage")!);
    PaysdeStage.value = item.Pays;
    let datedebut = (<HTMLInputElement>document.getElementById("Datededebut")!);
    datedebut.value = item.datedebut.substring(0, 10); // à fin de recuperer que la date YYYY-MM-DD
    let datefin = (<HTMLInputElement>document.getElementById("Datedefin")!);
    datefin.value = item.datefin.substring(0, 10);

    // get nom and prenom eleve with his id
    let data = {eleveId: item.ideleve};
    let response = this.service.sendGetMessageQuery("eleves/" + item.ideleve, data);
    response.subscribe(
      r => {
        let nomEleve = (<HTMLInputElement>document.getElementById("NomEtudiant")!);
        item.nomEleve = (<any>r)[0].nom;
        nomEleve.value = item.nomEleve;

        let prenomEleve = (<HTMLInputElement>document.getElementById("PrenomEtudiant")!);
        item.prenomEleve = (<any>r)[0].prenom;
        prenomEleve.value = item.prenomEleve;
      },
      error => {}
    );

    // get nom et prenom encadrant
    let data2 = {idsend: item.idens};
    response = this.service.sendGetMessageQuery("enseignantsNameById", data2);
    response.subscribe(
      r => {
        let Nomenseignantencadrant = (<HTMLInputElement>document.getElementById(
          "Nomenseignantencadrant"
        )!);
        item.Nomenseignantencadrant = r.data[0].nom;
        Nomenseignantencadrant.value = item.Nomenseignantencadrant;

        let Prenomenseignantencadrant = (<HTMLInputElement>document.getElementById(
          "Prenomenseignantencadrant"
        )!);
        item.Prenomenseignantencadrant = r.data[0].prenom;
        Prenomenseignantencadrant.value = item.Prenomenseignantencadrant;
      },
      error => {}
    );

    // get nom et prenom tuteur de stage
    let data3 = {idtuteur: item.idtuteur};
    response = this.service.sendGetMessageQuery("tuteurNameById", data3);
    response.subscribe(
      r => {
        let NomduTuteurdestagedanslentreprise = (<HTMLInputElement>document.getElementById(
          "NomduTuteurDesStagesDansLentreprise"
        )!);
        item.nomTuteur = (<any>r)[0].nom;
        NomduTuteurdestagedanslentreprise.value = item.nomTuteur;

        let PrenomduTuteurdestagedanslentreprise = (<HTMLInputElement>document.getElementById(
          "PrenomduTuteurDesStagesDansLentreprise"
        )!);
        item.prenomTuteur = (<any>r)[0].prenom;
        PrenomduTuteurdestagedanslentreprise.value = item.prenomTuteur;

        let MailTuteurdestagedanslentreprise = (<HTMLInputElement>document.getElementById(
          "MailTuteurDesStageDansLentreprise"
        )!);
        item.emailtuteur = (<any>r)[0].emailtuteur;
        MailTuteurdestagedanslentreprise.value = item.emailtuteur;
      },
      error => {}
    );

    let Adressedustage = (<HTMLInputElement>document.getElementById("Adressedustage")!);
    Adressedustage.value = item.adressestage;

    let Annee = (<HTMLInputElement>document.getElementById("Annee")!);
    Annee.value = item.annee;

    let Niveau = (<HTMLInputElement>document.getElementById("Niveau")!);
    Niveau.value = item.niveau;

    // le stage à modifier
    this.currentItem = item;
    //console.log(this.currentItem);

    $("#modifyModal").appendTo("body").modal("show");
  }

  SaveModifications(): void
  {
    let titrestage = (<HTMLInputElement>document.getElementById("Sujetdustage")!).value;
    let description = (<HTMLInputElement>document.getElementById("Descriptiondustage")!).value;
    let nomentreprise = (<HTMLInputElement>document.getElementById("Raisonsociale")!).value;
    let VilledeStage = (<HTMLInputElement>document.getElementById("VilledeStage")!).value;
    let PaysdeStage = (<HTMLInputElement>document.getElementById("PaysdeStage")!).value;
    let datedebut = (<HTMLInputElement>document.getElementById("Datededebut")!).value;
    let datefin = (<HTMLInputElement>document.getElementById("Datedefin")!).value;
    let prenomEleve = (<HTMLInputElement>document.getElementById("PrenomEtudiant")!).value;
    let nomEleve = (<HTMLInputElement>document.getElementById("NomEtudiant")!).value;
    let NomduTuteurdestagedanslentreprise = (<HTMLInputElement>document.getElementById(
      "NomduTuteurDesStagesDansLentreprise"
    )!).value;
    let PrenomduTuteurdestagedanslentreprise = (<HTMLInputElement>document.getElementById(
      "PrenomduTuteurDesStagesDansLentreprise"
    )!).value;
    let MailTuteurdestagedanslentreprise = (<HTMLInputElement>document.getElementById(
      "MailTuteurDesStageDansLentreprise"
    )!).value;
    let Adressedustage = (<HTMLInputElement>document.getElementById("Adressedustage")!).value;
    let Prenomenseignantencadrant = (<HTMLInputElement>document.getElementById(
      "Prenomenseignantencadrant"
    )!).value;
    let Nomenseignantencadrant = (<HTMLInputElement>document.getElementById(
      "Nomenseignantencadrant"
    )!).value;
    let Annee = (<HTMLInputElement>document.getElementById("Annee")!).value;
    let Niveau = (<HTMLInputElement>document.getElementById("Niveau")!).value;

    let newItem = this.currentItem;
    // mettre a jour le stage avec les nouvelles informations
    newItem.titrestage = titrestage;
    newItem.description = description;
    newItem.nomentreprise = nomentreprise;
    newItem.VilledeStage = VilledeStage;
    newItem.PaysdeStage = PaysdeStage;
    newItem.datedebut = datedebut;
    newItem.datefin = datefin;
    newItem.MailTuteurdestagedanslentreprise = MailTuteurdestagedanslentreprise;
    newItem.NomduTuteurdestagedanslentreprise = NomduTuteurdestagedanslentreprise;
    newItem.PrenomduTuteurdestagedanslentreprise = PrenomduTuteurdestagedanslentreprise;
    newItem.Prenomenseignantencadrant = Prenomenseignantencadrant;
    newItem.Nomenseignantencadrant = Nomenseignantencadrant;
    newItem.prenomEleve = prenomEleve;
    newItem.nomEleve = nomEleve;
    newItem.Adressedustage = Adressedustage;
    newItem.annee = Annee;
    newItem.niveau = Niveau;

    let indexItem = this.stages.indexOf(this.currentItem);
    this.stages[indexItem] = newItem;

    this.updateStage(newItem);

    $("#modifyModal").modal("hide");
  }

  closeModifications(): void
  {
    $("#modifyModal").modal("hide");
  }

  deleteStage(): void
  {
    let data = {};
    let response = this.service.sendGetMessageQuery("deleteStage/" + this.DeleteStageItem.idstage, data);
    response.subscribe(
      r => {
        this.toastr.success("Le stages a été supprimé avec succés");
        this.getAllStages();
      },
      error => {
        this.toastr.error("Erreur, le stage n'est pas supprimé");
      }
    );
    $("#deleteModal").modal("hide");
  }

  updateStage(element: any): void
  {
    let data = element;
    let response = this.service.sendPutMessage("stageInfos/" + element.idstage, data);
    response.subscribe(
      r => {
        this.toastr.success("Le stage a été mis à jour avec succés");
        this.getAllStages();
      },
      error => {
        this.toastr.error("Erreur, Les données du stage(s) ne sont pas enregistrées");
      }
    );
  }

  initDeleteStage(stage: any): void
  {
    this.DeleteStageItem = stage;
    $("#deleteModal").appendTo("body").modal("show");
  }

  annulerDeleteStage(): void
  {
    $("#deleteModal").modal("hide");
  }

}













