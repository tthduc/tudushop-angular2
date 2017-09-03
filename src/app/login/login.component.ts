import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from '../core/services/notification.service';
import { MessageConstants } from '../core/common/message.constant';
import { UrlConstants } from '../core/common/url.constant';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  model: any = {};
  returnUrl: string;
  constructor(private _authenService: AuthenService, private _notificationService: NotificationService,
  private _router : Router) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this._authenService.login(this.model.username, this.model.password).subscribe(data => {
      this._router.navigate([UrlConstants.HOME]);
    },error=>{
      this._notificationService.printErrorMessage(MessageConstants.LOGIN_AGAIN_MSG);
      this.loading = false;
    });
  }
}
