import { Component, OnInit , Output , EventEmitter } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AjoutEntrepriseDialogComponent} from "../ajout-entreprise-dialog/ajout-entreprise-dialog.component";
import {MessageService} from "../message/message.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ajout-entreprise',
  templateUrl: './ajout-entreprise.component.html',
  styleUrls: ['./ajout-entreprise.component.scss']
})
export class AjoutEntrepriseComponent implements OnInit {

  @Output() AjoutEntreprise = new EventEmitter<string>()

  constructor(private messageservice: MessageService, public dialog: MatDialog,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  OpenDialog(): void {
    const configDialog = new MatDialogConfig();

    configDialog.width = '60%' ;

    const dialogRef = this.dialog.open(AjoutEntrepriseDialogComponent,configDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.messageservice.sendMessage('entreprises',{nomcomplet: result}).subscribe(
          response => {
            console.log(response) ;
          }, error => {
            if (error.status == 201){
              this.toastr.success('Entreprise ajoutée') ;
              this.AjoutEntreprise.emit(result) ;
            }else if (error.status == 409) {
              this.toastr.error('Entreprise déjà présente') ;
            } else {
              this.toastr.error('Erreur lors de l\'ajout de l\'entreprise ') ;
            }
          } ) ;
      }else {
        this.toastr.error("Veuillez remplir le champ obligatoire") ;
      }
    })
  }
}
