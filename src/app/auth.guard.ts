import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  AppService
} from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private appService:AppService){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
    return this.checkToken();
  }

  checkToken() {
    if(this.appService.token != "")
      return true
    else
      return false
  }

}
