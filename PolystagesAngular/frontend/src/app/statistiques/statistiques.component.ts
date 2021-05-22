import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MessageService} from "../message/message.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

declare let google: any;

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {

  stages: any[] = [];
  annee: any[] = [];
  niveau: any[] = [];
  ville: any[] = [];

  constructor(private service: MessageService,
              private auth: AuthService,
              private router: Router,
              private toastr: ToastrService)
  {}

  ngOnInit(): void {
    this.getAllStages();
    this.allStagesInfosByAnnee();
    this.allStagesInfosByLevel();
    this.allStagesInfosByCity();
  }

  getAllStages(): void {
    // Tous
    let data = {};
    let response = this.service.sendGetMessageQuery("stages", data);
    response.subscribe(
      r => {
        this.recupererStages(r);
        this.getNomEntreprise(this.stages);
      },
      error => {
      }
    );
  }

  allStagesInfosByAnnee(): void {
    // Par année
    let data = {};
    let response = this.service.sendGetMessageQuery("statistique/1", data);
    response.subscribe(
      r => {
        this.recupererStagesAnnee(r);

        this.getGrapheYear(this.annee);

      },
      error => {
      }
    );
  }

  allStagesInfosByLevel(): void {
    // Par niveau
    let data = {};
    let response = this.service.sendGetMessageQuery("statistique/2", data);
    response.subscribe(
      r => {
        this.recupererStagesNiveau(r);

        this.getGrapheLevel(this.niveau);

      },
      error => {
      }
    );
  }

  allStagesInfosByCity(): void {
    // Par ville
    let data = {};
    let response = this.service.sendGetMessageQuery("statistique/3", data);
    response.subscribe(
      r => {
        this.recupererStagesVille(r);

        this.getGrapheCity(this.ville);

      },
      error => {}
    );
  }

  recupererStages(data: any): void
  {
    this.stages = data;
  }

  recupererStagesAnnee(data: any): void
  {
    this.annee = data;
  }

  recupererStagesNiveau(data: any): void
  {
    this.niveau = data;
  }

  recupererStagesVille(data: any): void
  {
    this.ville = data;
  }

  getNomEntreprise(stages: any[]): any[]
  {
    stages.forEach(element => {

      let data = {};
      let response = this.service.sendGetMessageQuery("entreprises/ById/" + element.identreprise, data);
      response.subscribe(
        r => {this.setEntrepriseName(element, r);},
        error => {}
      );

    });
    return stages
  }

  setEntrepriseName(element: any, data: any): void
  {
    element.nomentreprise = data.nomcomplet;
  }

  getGrapheYear(tab: any[]): void
  {
    google.charts.load('current', {

      // Définition du package pour le graphique
      packages: ['corechart'],

      // Fonction à exécuter lorsque l'API est téléchargée
      callback: function() {

        // Création de la visualisation "PieChart"
        var chart = new google.visualization.PieChart(document.getElementById('statYear'));

        // Formatage des options du graphique
        var options = {
          title : 'Statistique par année',
          width : 800,
          height: 700,
          is3D:true
        };

        // Formatage des données
        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Year');
        data.addColumn('number', 'Number of internships');
        for(let i = 0; i < tab.length; i++) {
          data.addRows([
            [tab[i].annee.toString(), tab[i].nbre_stage],
          ]);
        }

        // Dessin du graphique avec les données et les options
        chart.draw(data, options);

      }
    });
  }

  getGrapheLevel(tab: any[]): void
  {
    google.charts.load('current', {

      // Définition du package pour le graphique
      packages: ['corechart'],

      // Fonction à exécuter lorsque l'API est téléchargée
      callback: function() {

        // Création de la visualisation "PieChart"
        var chart = new google.visualization.PieChart(document.getElementById('statLevel'));

        // Formatage des options du graphique
        var options = {
          title : 'Statistique par niveau',
          width : 800,
          height: 700,
          is3D:true
        };

        // Formatage des données
        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Level');
        data.addColumn('number', 'Number of students');
        for(let i = 0; i < tab.length; i++) {
          data.addRows([
            [tab[i].niveau.toString(), tab[i].nbre],
          ]);
        }

        // Dessin du graphique avec les données et les options
        chart.draw(data, options);

      }
    });
  }

  getGrapheCity(tab: any[]): void
  {
    google.charts.load('current', {
      // Définition du package pour le graphique
      packages: ['corechart'],

      // Fonction à exécuter lorsque l'API est téléchargée
      callback: function() {

        // Création de la visualisation "PieChart"
        var chart = new google.visualization.PieChart(document.getElementById('statCity'));

        // Formatage des options du graphique
        var options = {
          title : 'Statistique nombre de stage par ville',
          width : 800,
          height: 700,
          is3D:true
        };

        // Formatage des données
        var data = new google.visualization.DataTable();

        data.addColumn('string', 'City');
        data.addColumn('number', 'Number of internships');
        for(let i = 0; i < tab.length; i++) {
          data.addRows([
            [tab[i].ville, tab[i].nbre_stage],
          ]);
        }

        // Dessin du graphique avec les données et les options
        chart.draw(data, options);

      }
    });
  }

}
