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
import {
  InfoDialogComponent
} from '../dialog/info-dialog/info-dialog.component';
import {
  SpinDialogComponent
} from '../dialog/spin-dialog/spin-dialog.component';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  constructor(private appService: AppService, private dialog: MatDialog) {}
  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;

  displayedColumns: string[] = ["Name", "Student"]
  dataSource

  ngOnInit(): void {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.appService.getAllCompany().subscribe(
      next => {
        spinDialog.close()
        this.dataSource = new MatTableDataSource(next)
        this.dataSource.paginator = this.paginator;
        this.dialog.open(InfoDialogComponent, {
          data: {
            result: {info: 'Load data success'}
          }
        })
      }
    )
  }
}
