import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { LoginComponent } from './login/login.component';
import { StudentInfoComponent } from './student-info/student-info.component';

const routes: Routes = [
  {path:'student', component:StudentInfoComponent, canActivate: [AuthGuard]},
  {path:'company', component:CompanyInfoComponent, canActivate: [AuthGuard]},
  {path:'', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
