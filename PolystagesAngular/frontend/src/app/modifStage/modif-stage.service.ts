import { Injectable } from '@angular/core';
import {MessageService} from "../message/message.service";

@Injectable({
  providedIn: 'root'
})
export class ModifStageService {

  StageToEdit: any ;
  Tuteur: any ;

  constructor(private messageservice: MessageService) {
  }

  affecterStage(stageAmodifier:any): Promise<void> {
    this.StageToEdit = stageAmodifier ;



    return new Promise((resolve, reject) => {
      this.messageservice.sendGetMessageQuery("tuteurNameById",{idtuteur:this.StageToEdit.idtuteur}).subscribe(reponse =>{
          this.Tuteur = reponse ;
          this.Tuteur = this.Tuteur[0] ;
          resolve() ;
        },
        error => {
          console.log(error) ;
          return reject(error) ;
        }) ;
    });


  }

  cleanStage():void {
    this.StageToEdit = null;
    this.Tuteur = null;
  }
}
