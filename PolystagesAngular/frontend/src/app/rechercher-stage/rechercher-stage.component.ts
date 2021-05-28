import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MessageService} from "../message/message.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-rechercher-stage',
  templateUrl: './rechercher-stage.component.html',
  styleUrls: ['./rechercher-stage.component.scss']
})
export class RechercherStageComponent implements OnInit {

  displayedColumns: string[] = ['#', 'titrestage', 'description', 'niveau', 'annee', 'modifier', 'supprimer'];
  stages: any[] = [];
  dataSource = new MatTableDataSource<any>(this.stages);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchValue: string = "";

  currentItem: any = {};

  constructor(private service: MessageService,
              private auth: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void
  {
    this.getAllStages();
  }

  getAllStages(): void
  {
    let data = {};
    let response = this.service.sendGetMessageQuery("stages", data);
    response.subscribe(
      r => {
        this.stages = r.data;
        this.dataSource.data = this.stages;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {}
    );
  }

  allStagesBySearchValue(): void
  {
    if (this.searchValue == "")
    {
      this.getAllStages();
    }
    else
    {
      let data = {val: this.searchValue};
      let response = this.service.sendGetMessageQuery("stages/byVal/" + this.searchValue, data);
      response.subscribe(
        r => {
          this.stages = r.data;
          this.dataSource.data = this.stages;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
        }
      );
    }
  }

  oneStageJsonToCsv(stage: any): void
  {

  }

  allStagesJsonToCsv(): void
  {

  }

  getAllStagesId(): any
  {

  }

  allStagesInfosById(): void
  {

  }

  initModify(idstage: number): void
  {

  }

  SaveModifications(): void
  {

  }

  deleteStage(): void
  {

  }

  updateStage(element: any): void
  {

  }

  init(item: any): void
  {

  }

  initDeleteStage(idstage: number): void
  {

  }

}













