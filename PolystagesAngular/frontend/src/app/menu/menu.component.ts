import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() displayMenu: string = "";

  displayAccueil: boolean = false;
  displayAdministration: boolean = false;
  displayAjoutStage: boolean = false;
  displayRechercheStage: boolean = false;
  displayStatistiques: boolean = false;

  constructor()
  {}

  ngOnInit(): void
  {
    let displayMenuS: string[] = this.displayMenu.split(",");

    if (displayMenuS.includes("Accueil")) this.displayAccueil = true;
    if (displayMenuS.includes("Administration")) this.displayAdministration = true;
    if (displayMenuS.includes("AjoutStage")) this.displayAjoutStage = true;
    if (displayMenuS.includes("RechercheStage")) this.displayRechercheStage = true;
    if (displayMenuS.includes("Statistiques")) this.displayStatistiques = true;
  }

}
