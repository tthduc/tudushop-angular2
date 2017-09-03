import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { SystemConstant } from '../../core/common/system.constant';
import { MessageConstants } from '../../core/common/message.constant';
import { AuthenService } from '../../core/services/authen.service';
import { UtilityService } from '../../core/services/utility.service';
import { NotificationService } from '../../core/services/notification.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  //Bất kì request đều phải có headers nếu không nó sẽ bị văng ra ngay vì thằng server nó sẽ không nhận dc token
  private headers: Headers;
  constructor(private _http: Http, private _router: Router, private _authenService: AuthenService,
    private _notificationService: NotificationService, private _utilityService: UtilityService) {
    this.headers = new Headers();
    this.headers.append('content-Type', 'application/json');
  }

  get(url: string) {
    this.headers.delete("Authorization");
    //Lấy token
    this.headers.append("Authorization", "Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.get(SystemConstant.BASE_API + url, { headers: this.headers }).map(this.extractData);
  }
  post(url: string, data?: any) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.post(SystemConstant.BASE_API + url, data, { headers: this.headers });
  }
  put(url: string, data?: any) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.put(SystemConstant.BASE_API + url, data, { headers: this.headers });
  }
  delete(uri: string, key: string, id: string) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.delete(SystemConstant.BASE_API + uri + "/?" + key + "=" + id, { headers: this.headers })
      .map(this.extractData);
  }

  //Đối postFile với không dùng chung
  postFile(uri: string, data?: any) {
    let newHeader = new Headers();
    newHeader.append("Authorization", "Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.post(SystemConstant.BASE_API + uri, data, { headers: newHeader })
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  public handleError(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstant.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageConstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    }
    else {
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Lỗi hệ thống';
      this._notificationService.printErrorMessage(errMsg);

      return Observable.throw(errMsg);
    }

  }
}
