import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  Router
} from '@angular/router';
import {
  AppService
} from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private appService: AppService, private router:Router) {}

  ngOnInit(): void {}

  login_info = new FormGroup({
    student_name: new FormControl('', Validators.required),
    student_password: new FormControl('', Validators.required)
  })

  login_submit() {
    if (this.login_info.value.student_password == '' || this.login_info.value.student_name == '') {
      this.snackBar.open('內容不能為空', 'Close', {
        duration: 1500,
        panelClass: 'warn_snackBar'
      })
    } else {
      this.appService.loginRequest(this.login_info).subscribe(
        next => {
          this.appService.token = next.info
          this.router.navigate(['student'])
        },
        error => {
          this.snackBar.open(error.error.info, 'Close', {
            duration: 1500,
            panelClass: 'warn_snackBar'
          })
        }
      )
    }
  }
}