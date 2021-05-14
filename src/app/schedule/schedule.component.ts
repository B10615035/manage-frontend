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
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(private appService: AppService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.update_schedule()
  }

  displayedColumns: string[] = ["Time", "com1", "com2", "com3", "com4", "com5",  "com7", "com8", "com6", "com9", "com10"]
  dataSource
  table = []

  create_table(data) {
    this.table = []
    var start = ["09:40", "09:51", "10:02", "10:13", "10:24", "10:35", "10:46", "10:57", "11:08", "11:19", "11:30", "11:41",
      "13:00", "13:11", "13:22", "13:33", "13:44", "13:55", "14:06", "14:17", "14:28", "14:39", "14:50", "15:01"
    ]
    var end = ["9:50", "10:01", "10:12", "10:23", "10:34", "10:45", "10:56", "11:07", "11:18", "11:29", "11:40", "11:50",
      "13:10", "13:21", "13:32", "13:43", "13:54", "14:05", "14:16", "14:27", "14:38", "14:49", "15:00", "15:11"
    ]
    for (let i = 0; i < 24; i++) {
      this.table.push({
        start: start[i],
        end: end[i],
        com1: data['中華電信'][i],
        com2: data['台達電子'][i],
        com3: data['邑富'][i],
        com4: data['利凌企業'][i],
        com5: data['英業達'][i],
        com6: data['研揚IOT'][i],
        com7: data['鈊象電子'][i],
        com8: data['緯創資通'][i],
        com9: data['研揚SDD1'][i],
        com10: data['研揚SDD2'][i],
      })
      // special case
      if (i == 11) {
        this.table.push({
          start: "11:51",
          end: "12:01",
          com1: "",
          com2: "",
          com3: "",
          com4: "",
          com5: "",
          com6: "詹凱宇",
          com7: "陳冠樺",
          com8: "",
          com9: "鄭國勤",
          com10: "",
        }, {
          start: "12:02",
          end: "12:12",
          com1: "",
          com2: "",
          com3: "",
          com4: "",
          com5: "",
          com6: "陳柏翰",
          com7: "",
          com8: "",
          com9: "陳彥寬",
          com10: "",
        }, {
          start: "12:38",
          end: "12:48",
          com1: "",
          com2: "",
          com3: "",
          com4: "",
          com5: "",
          com6: "",
          com7: "",
          com8: "",
          com9: "",
          com10: "蕭子誼",
        }, {
          start: "12:49",
          end: "12:59",
          com1: "",
          com2: "",
          com3: "",
          com4: "",
          com5: "",
          com6: "",
          com7: "",
          com8: "",
          com9: "",
          com10: "陳柏均",
        })
      }
    }
    this.dataSource = new MatTableDataSource(this.table)
  }

  update_schedule() {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.appService.getSchedule().subscribe(
      next => {
        spinDialog.close()
        this.create_table(next.info)
      }
    )
  }
}