import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  AppService
} from '../app.service';
import { SpinDialogComponent } from '../dialog/spin-dialog/spin-dialog.component';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  constructor(private appService: AppService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.create_table()
  }
  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;

  displayedColumns: string[] = ["Idnetity", "Name", "ID", "Action", "Content"]
  dataSource

  create_table() {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.appService.getLog().subscribe(
      next => {
        spinDialog.close()
        this.dataSource = new MatTableDataSource(next)
        this.dataSource.paginator = this.paginator;
      }
    )
  }
}
