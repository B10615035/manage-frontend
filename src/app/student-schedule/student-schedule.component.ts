import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  AppService
} from '../app.service';
import {
  SpinDialogComponent
} from '../dialog/spin-dialog/spin-dialog.component';

@Component({
  selector: 'app-student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.scss']
})
export class StudentScheduleComponent implements OnInit {

  constructor(private appService: AppService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.update_schedule()
  }

  displayedColumns: string[] = ["Time"]
  dataSource
  table = []
  studentName: string[] = []
  studentHeader: string[] = []

  reset_index(index) {
    if (index >= 12) {
      index += 4
    }
    return index
  }

  create_table(data) {
    var start = ["09:40", "09:51", "10:02", "10:13", "10:24", "10:35", "10:46", "10:57", "11:08", "11:19", "11:30", "11:41", "12:00", "12:11", "12:38", "12:49", "13:00", "13:11", "13:22", "13:33", "13:44", "13:55", "14:06", "14:17", "14:28", "14:39", "14:50", "15:01"]
    var end = ["9:50", "10:01", "10:12", "10:23", "10:34", "10:45", "10:56", "11:07", "11:18", "11:29", "11:40", "11:50", "12:10", "12:21", "12:48", "12:59", "13:10", "13:21", "13:32", "13:43", "13:54", "14:05", "14:16", "14:27", "14:38", "14:49", "15:00", "15:11"]

    console.log(data)
    this.table = []

    var student = []

    for (let i in data) {
      this.displayedColumns.push(data[i].name)
      this.studentName.push(data[i].name)
      this.studentHeader.push(data[i].name + "<br>" + data[i].id)
      var temp = []
      for (let j = 0; j < 28; j++)
        temp.push("")
      for (let j = 0; j < data[i].stage_one.length; j++) {
        if (data[i].stage_one[j] == "中華電信") {
          temp[this.reset_index(data[i].stage_one_index[j])] = data[i].stage_one[j]
          temp[this.reset_index(data[i].stage_one_index[j + 1])] = data[i].stage_one[j]
          data[i].stage_one_index.splice(j + 1, 1)
        } else if (data[i].stage_one[j] == "鈊象電子" && (data[i].name == "柯元豪" || data[i].name == "賴俊霖" || data[i].name == "陳柏翰" || data[i].name == "徐貫珉" || data[i].name == "鐘良軒")) {
          temp[this.reset_index(data[i].stage_one_index[j])] = data[i].stage_one[j]
          temp[this.reset_index(data[i].stage_one_index[j + 1])] = data[i].stage_one[j]
          data[i].stage_one_index.splice(j + 1, 1)
        } else if (data[i].stage_one[j] == "鈊象電子" && (data[i].name == "陳冠樺")) {
          temp[this.reset_index(data[i].stage_one_index[j])] = data[i].stage_one[j]
          temp[12] = data[i].stage_one[j]
        } else if (data[i].stage_one[j] == "研揚IOT" && (data[i].name == "陳俊霖")) {
          data[i].stage_one_index.splice(j, 0, -1)
          temp[12] = data[i].stage_one[j]
        } else if (data[i].stage_one[j] == "研揚IOT" && (data[i].name == "陳柏翰")) {
          data[i].stage_one_index.splice(j, 0, -1)
          temp[13] = data[i].stage_one[j]
        } else if (data[i].stage_one[j] == "研揚SDD1" && (data[i].name == "鄭國勤")) {
          data[i].stage_one_index.splice(j, 0, -1)
          temp[12] = data[i].stage_one[j]
        } else if (data[i].stage_one[j] == "研揚SDD1" && (data[i].name == "陳彥寬")) {
          data[i].stage_one_index.splice(j, 0, -1)
          temp[13] = data[i].stage_one[j]
        } else if (data[i].stage_one[j] == "研揚SDD2" && (data[i].name == "蕭子誼")) {
          data[i].stage_one_index.splice(j, 0, -1)
          temp[14] = data[i].stage_one[j]
        } else if (data[i].stage_one[j] == "研揚SDD2" && (data[i].name == "陳柏均")) {
          data[i].stage_one_index.splice(j, 0, -1)
          temp[15] = data[i].stage_one[j]
        } else {
          temp[this.reset_index(data[i].stage_one_index[j])] = data[i].stage_one[j]
        }
      }
      student.push(temp)
    }

    for (let i = 0; i < 28; i++) {
      var company = []
      for (let j in data) {
        company.push(student[j][i])
      }
      this.table.push({
        start: start[i],
        end: end[i],
        company: company
      })
    }
    this.dataSource = new MatTableDataSource(this.table)
  }



  update_schedule() {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.appService.getAllStudent().subscribe(
      next => {
        spinDialog.close()
        this.create_table(next)
      }
    )
  }
}