import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { LogComponent } from './log/log.component';
import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { StudentScheduleComponent } from './student-schedule/student-schedule.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'student', component:StudentInfoComponent, canActivate: [AuthGuard]},
  {path:'company', component:CompanyInfoComponent, canActivate: [AuthGuard]},
  {path:'logs', component:LogComponent, canActivate: [AuthGuard]},
  {path:'', component:ScheduleComponent, canActivate: [AuthGuard]},
  {path:'schedule', component:ScheduleComponent, canActivate: [AuthGuard]},
  {path:'schedule-stu', component:StudentScheduleComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
