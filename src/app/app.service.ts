import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  delay
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) {}

  token:string = ""

  loginRequest(login_info): Observable < any > {
    var data = {
      name: login_info.value.student_name,
      password: login_info.value.student_password
    }
    return this.httpClient.post < any > (`http://127.0.0.1:8001/manage/login`,data, {
      headers: new HttpHeaders,
    }).pipe(delay(1500))
  }

  createStudent(student_info): Observable < any > {
    var data = {
      name: student_info.value.student_name,
      id: student_info.value.student_id,
      email: student_info.value.student_email,
      phone: student_info.value.student_phone,
    }
    return this.httpClient.post < any > ("http://127.0.0.1:8001/manage/student", data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    }).pipe(delay(1500))
  }

  getAllStudent(): Observable < any > {
    return this.httpClient.get < any > ("http://127.0.0.1:8001/manage/student", {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    }).pipe(delay(1500))
  }

  deleteStudent(student_id): Observable < any > {
    return this.httpClient.delete < any > (`http://127.0.0.1:8001/manage/student/${student_id}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    }).pipe(delay(1500))
  }
}
