import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  CookieService
} from 'ngx-cookie-service';
import {
  Observable
} from 'rxjs';
import {
  delay, map
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  loginRequest(login_info): Observable < any > {
    var data = {
      name: login_info.value.student_name,
      password: login_info.value.student_password
    }
    return this.httpClient.post < any > (`http://54.199.212.42:8001/manage/login`, data, {
      headers: new HttpHeaders,
    }).pipe(delay(1500))
  }

  createStudent(student_info): Observable < any > {
    var data = {
      name: student_info.value.student_name,
      id: student_info.value.student_id,
      email: student_info.value.student_email,
      school: student_info.value.student_school,
    }
    return this.httpClient.post < any > ("http://54.199.212.42:8001/manage/student", data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    }).pipe(delay(1500))
  }

  getAllStudent(): Observable < any > {
    return this.httpClient.get < any > ("http://54.199.212.42:8001/manage/student", {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    }).pipe(delay(1500))
  }

  deleteStudent(student_id): Observable < any > {
    return this.httpClient.delete < any > (`http://54.199.212.42:8001/manage/student/${student_id}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    }).pipe(delay(1500))
  }

  getAllCompany(): Observable < any > {
    return this.httpClient.get < any > ("http://54.199.212.42:8001/manage/company", {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    }).pipe(delay(1500))
  }

  setCookie(token) {
    this.cookieService.set("token", token)
    this.cookieService.set("user", "admin")
  }

  checkTokenInService(): Observable < any > {
    return this.checkToken().pipe(
      map(data => {
        return data.info
      })
    )
  }

  checkToken(): Observable < any > {
    var data = this.getCookie()
    if (!data)
      data = "login"
    return this.httpClient.post < any > (`http://54.199.212.42:8001/auth`, {
      token: data
    }, {
      headers: new HttpHeaders(),
    })
  }

  getCookie() {
    return this.cookieService.get('token')
  }

  checkCookie() {
    return this.cookieService.check('token')
  }

  deleteCookie(){
    this.cookieService.deleteAll()
  }
}
