import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SystemConstant } from '../../core/common/system.constant';
import 'rxjs/add/operator/map'
import { LoggedInUser } from '../domain/loggedin.user';

@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }

  login(username: string, password: string) {
    let body = "userName=" + encodeURIComponent(username) +
      "&password=" + encodeURIComponent(password) +
      "&grant_type=password";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    //RequestOptions dùng để chứa headers
    let option = new RequestOptions({ headers: headers });
    return this._http.post(SystemConstant.BASE_API + '/api/oauth/token', body, option).map((response: Response) => {
      let user: LoggedInUser = response.json();
      if (user && user.access_token) {
        localStorage.removeItem(SystemConstant.CURRENT_USER);
        localStorage.setItem(SystemConstant.CURRENT_USER, JSON.stringify(user));
      }
    });
  }

  logout() {
    localStorage.removeItem(SystemConstant.CURRENT_USER);
  }

  isUserAuthenticated(): boolean {
    let user = localStorage.getItem(SystemConstant.CURRENT_USER);
    if (user != null) {
      return true;
    }
    else
      return false;
  }

  getLoggedInUser(): LoggedInUser {
    let user: LoggedInUser;
    if (this.isUserAuthenticated()) {
      var userData = JSON.parse(localStorage.getItem(SystemConstant.CURRENT_USER));
      user = new LoggedInUser(userData.access_token, userData.username, userData.fullname, userData.email, userData.avatar);
    }
    else
      user = null;
    return user;
  }
}
