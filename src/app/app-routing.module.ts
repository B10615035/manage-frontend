import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentInfoComponent } from './student-info/student-info.component';

const routes: Routes = [
  {path:'', component:StudentInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
