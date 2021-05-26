import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  displayAccueilEleve: boolean = false;
  displayAccueilEnseignant: boolean = false;
  displayAccueilTuteur: boolean = false;
  displayAdministration: boolean = false;
  displayAjoutStage: boolean = false;
  displayRechercheStage: boolean = false;
  displayStatistiques: boolean = false;

  constructor(private authservice: AuthService, private router: Router)
  {}

  ngOnInit(): void
  {
    this.router.events.subscribe((ev) =>
    {
      this.displayAccueilEleve = false;
      this.displayAccueilEnseignant = false;
      this.displayAdministration = false;
      this.displayAjoutStage = false;
      this.displayRechercheStage = false;
      this.displayStatistiques = false;
      this.displayAccueilTuteur = false;

      if (this.authservice.isAuthenticated())
      {
        if (this.authservice.getRole() == "eleve")
        {
          this.displayAccueilEleve = true;
        }
        else if (this.authservice.getRole() == "enseignant")
        {
          this.displayAccueilEnseignant = true;
          this.displayAdministration = true;
          this.displayAjoutStage = true;
          this.displayRechercheStage = true;
          this.displayStatistiques = true;
        }
        else if (this.authservice.getRole() == "tuteur")
        {
          this.displayAccueilTuteur = true;
        }
      }
    });
  }

  /*
  navigate(chemin: string)
  {
      this.router.navigateByUrl(chemin);
  }
  */

}
