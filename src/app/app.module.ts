import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StudentInfoComponent } from './student-info/student-info.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinDialogComponent } from './dialog/spin-dialog/spin-dialog.component';
import { InfoDialogComponent } from './dialog/info-dialog/info-dialog.component';
import { LoginComponent } from './login/login.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { LogComponent } from './log/log.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StudentScheduleComponent } from './student-schedule/student-schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentInfoComponent,
    SpinDialogComponent,
    InfoDialogComponent,
    LoginComponent,
    CompanyInfoComponent,
    LogComponent,
    ScheduleComponent,
    StudentScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
