import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnteteComponent } from './entete/entete.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
// @ts-ignore
import { MatButtonModule } from '@angular/material/button';
// @ts-ignore
import { MatIconModule } from '@angular/material/icon';
// @ts-ignore
import { MatListModule } from '@angular/material/list';
// @ts-ignore
import { MatSidenavModule } from '@angular/material/sidenav';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EleveComponent } from './eleve/eleve.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { TuteurComponent } from './tuteur/tuteur.component';
import { AdministrationComponent } from './administration/administration.component';
import { AjouterStageComponent } from './ajouter-stage/ajouter-stage.component';
import { RechercherStageComponent } from './rechercher-stage/rechercher-stage.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRippleModule} from "@angular/material/core";
import { FormStageComponent } from './form-stage/form-stage.component';
import {MatSelectModule} from '@angular/material/select';
import { InputsModule } from 'angular-bootstrap-md'
import {MdbModalModule} from "mdb-angular-ui-kit";

@NgModule({
  declarations: [
    AppComponent,
    EnteteComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    EleveComponent,
    EnseignantComponent,
    TuteurComponent,
    AdministrationComponent,
    AjouterStageComponent,
    RechercherStageComponent,
    StatistiquesComponent,
    FormStageComponent
    StatistiquesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatRippleModule,
    MdbModalModule
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatRippleModule,
        MatSelectModule,
        ReactiveFormsModule,
        InputsModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
