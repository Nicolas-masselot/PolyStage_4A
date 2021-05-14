import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-ajout-entreprise-dialog',
  templateUrl: './ajout-entreprise-dialog.component.html',
  styleUrls: ['./ajout-entreprise-dialog.component.scss']
})
export class AjoutEntrepriseDialogComponent implements OnInit {

  nouvelleentreprise: string | undefined ;

  constructor(public dialogRef: MatDialogRef<AjoutEntrepriseDialogComponent>) { }

  ngOnInit(): void {
  }

  onNoClick():void {
    this.dialogRef.close() ;
  }

  AjouterEntreprise(): void {
    this.dialogRef.close(this.nouvelleentreprise) ;
  }


}
