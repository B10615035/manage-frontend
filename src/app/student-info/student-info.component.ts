import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
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
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private appService: AppService) {}
  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;


  ngOnInit() {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.create_table(spinDialog, {
      info: 'Load data success'
    })
  }

  displayedColumns: string[] = ["Name", "ID", "School", "Email", "Company"]
  dataSource

  student_info = new FormGroup({
    student_name: new FormControl('', Validators.required),
    student_id: new FormControl('', Validators.required),
    student_email: new FormControl('', [Validators.required, Validators.email]),
    student_school: new FormControl('', Validators.required),
  })
  deleteStudentID: string = ""

  create_student_submit() {
    var student_info_check = true
    Object.keys(this.student_info.controls).forEach(key => {
      if (this.student_info.get(key).errors) {
        student_info_check = false
        this.snackBar.open(`${key} 內容/格式錯誤`, 'Close', {
          duration: 1500,
          panelClass: 'warn_snackBar'
        })
      }
    })

    if (student_info_check) {
      this.create_student()
    }
  }

  delete_student_submit() {
    if (this.deleteStudentID == "") {
      this.snackBar.open(`准考證不能為空`, 'Close', {
        duration: 1500,
        panelClass: 'warn_snackBar'
      })
    } else {
      this.delete_student()
    }
  }

  delete_student() {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.appService.deleteStudent(this.deleteStudentID).subscribe(
      next => {
        this.create_table(spinDialog, next)
        this.deleteStudentID = ""
      }
    )
  }

  create_student() {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.appService.createStudent(this.student_info).subscribe(
      next => {
        this.create_table(spinDialog, next)
        this.student_info.reset()
      },
      error => {
        spinDialog.close()
        this.dialog.open(InfoDialogComponent, {
          data: {
            result: {
              info: 'find duplicate student id'
            }
          }
        })
      }
    )
  }

  create_table(spinDialog, info) {
    this.appService.getAllStudent().subscribe(
      next => {
        spinDialog.close()
        this.dataSource = new MatTableDataSource(next)
        this.dataSource.paginator = this.paginator;
        this.dialog.open(InfoDialogComponent, {
          data: {
            result: info
          }
        })
      }
    )
  }
}
