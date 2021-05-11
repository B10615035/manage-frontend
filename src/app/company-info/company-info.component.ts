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
  companyData

  ngOnInit(): void {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.appService.getAllCompany().subscribe(
      next => {
        spinDialog.close()
        this.companyData = next
        this.dataSource = new MatTableDataSource(next)
        this.dataSource.paginator = this.paginator;
        this.dialog.open(InfoDialogComponent, {
          data: {
            result: {
              info: 'Load data success'
            }
          }
        })
        // this.make_csv(next)
      }
    )
  }

  make_csv() {
    var csv = "公司,學生\r\n"
    for (let i in this.companyData) {
      csv += this.companyData[i].name + ",\"" + this.companyData[i].students + "\"\r\n"
    }

    let blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });

    let url = URL.createObjectURL(blob);
    let download = document.createElement("a");
    download.setAttribute("href", url);
    download.setAttribute("download", `CompanyChooseStudent.csv`);
    download.style.visibility = "hidden";
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
  }
}
