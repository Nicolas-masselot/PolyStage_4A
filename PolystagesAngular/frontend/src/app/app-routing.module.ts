import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./auth/auth.guard";
import {AuthEleveGuard} from "./auth/auth-eleve.guard";
import {AuthEnseignantGuard} from "./auth/auth-enseignant.guard";
import {AuthTuteurGuard} from "./auth/auth-tuteur.guard";
import {EleveComponent} from "./eleve/eleve.component";
import {EnseignantComponent} from "./enseignant/enseignant.component";
import {TuteurComponent} from "./tuteur/tuteur.component";
import {AjouterStageComponent} from "./ajouter-stage/ajouter-stage.component";
import {RechercherStageComponent} from "./rechercher-stage/rechercher-stage.component";
import {AdministrationComponent} from "./administration/administration.component";
import {StatistiquesComponent} from "./statistiques/statistiques.component";

const routes: Routes =  [
  {path: "", pathMatch: "full", redirectTo: "login"},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "enseignant", component: EnseignantComponent},
  {path: "administration", component: AdministrationComponent},
  {path: "ajouterStage", component: AjouterStageComponent},
  {path: "rechercherStage", component: RechercherStageComponent},
  {path: "statistiques", component: StatistiquesComponent},
  {path: "", canActivateChild: [AuthEleveGuard], children: [
      {path: "eleve", component: EleveComponent}
    ]},
  {path: "", canActivateChild: [AuthEnseignantGuard], children: [

    ]},
  {path: "", canActivateChild: [AuthTuteurGuard], children: [
      {path: "tuteur", component: TuteurComponent}
    ]},
];

/*
const routes: Routes =  [
  {path: "", pathMatch: "full", redirectTo: "login"},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "", canActivateChild: [AuthEleveGuard], children: [
      {path: "eleve", component: EleveComponent}
    ]},
  {path: "", canActivateChild: [AuthEnseignantGuard], children: [
      {path: "enseignant", component: EnseignantComponent},
      {path: "administration", component: AdministrationComponent},
      {path: "ajouterStage", component: AjouterStageComponent},
      {path: "rechercherStage", component: RechercherStageComponent},
      {path: "statistiques", component: StatistiquesComponent}
    ]},
  {path: "", canActivateChild: [AuthTuteurGuard], children: [
      {path: "tuteur", component: TuteurComponent}
    ]},
];
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
