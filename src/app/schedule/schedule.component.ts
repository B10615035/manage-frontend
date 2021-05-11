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

  displayedColumns: string[] = ["Time", "com1", "com2", "com3", "com4", "com5", "com6", "com7", "com8"]
  dataSource
  table = []

  create_table(data) {
    this.table = []
    var start = ["9:40", "10:15", "10:50", "11:25", "13:00", "13:35", "14:10", "14:45"]
    var end = ["10:10", "10:45", "11:20", "11:55", "13:30", "14:05", "14:40", "15:15"]
    for (let i = 0; i < 8; i++) {
      this.table.push({
        start: start[i],
        end: end[i],
        com1: data['中華電信'][i].toString().replaceAll(",", "<br>"),
        com2: data['台達電子'][i].toString().replaceAll(",", "<br>"),
        com3: data['邑富'][i].toString().replaceAll(",", "<br>"),
        com4: data['利凌企業'][i].toString().replaceAll(",", "<br>"),
        com5: data['英業達'][i].toString().replaceAll(",", "<br>"),
        com6: data['研揚科技'][i].toString().replaceAll(",", "<br>"),
        com7: data['鈊象電子'][i].toString().replaceAll(",", "<br>"),
        com8: data['緯創資通'][i].toString().replaceAll(",", "<br>"),
      })
    }
    this.dataSource = new MatTableDataSource(this.table)
  }

  update_schedule(){
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.appService.getSchedule().subscribe(
      next => {
        spinDialog.close()
        this.create_table(next.info)
      }
    )
  }
}
