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

const routes: Routes =  [
  {path: "", pathMatch: "full", redirectTo: "login"},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "", canActivateChild: [AuthEleveGuard], children: [
      {path: "eleve", component: EleveComponent}
    ]},
  {path: "", canActivateChild: [AuthEnseignantGuard], children: [
      {path: "enseignant", component: EnseignantComponent}
    ]},
  {path: "", canActivateChild: [AuthTuteurGuard], children: [
      {path: "tuteur", component: TuteurComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
