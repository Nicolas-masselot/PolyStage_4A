import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{

  identifiant = "";
  password = "";

  constructor(private service: AuthService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void
  {}

  tryConnection()
  {
    this.service.sendAuthentication(this.identifiant, this.password).subscribe(r =>
    {
      if (r[0]["role"] == "eleve")
      {
        this.router.navigateByUrl("/eleve");
      }
      else if (r[0]["role"] == "enseignant")
      {
        this.router.navigateByUrl("/enseignant");
      }
      else if (r[0]["role"] == "tuteur")
      {
        this.router.navigateByUrl("/tuteur");
      }
    },
    error =>
    {
      this.toastr.error("Mauvais identifiant / mot de passe");
    });
  }

}
