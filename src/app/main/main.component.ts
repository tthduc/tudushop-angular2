import { Component, OnInit } from '@angular/core';
import { SystemConstant } from '../core/common/system.constant';
import { UrlConstants } from '../core/common/url.constant';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { LoggedInUser } from '../core/domain/loggedin.user';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: LoggedInUser;
  constructor(private _utilityService: UtilityService, private _authenService : AuthenService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(SystemConstant.CURRENT_USER));
    console.log(this.user);
  }

  logout() {
    localStorage.removeItem(SystemConstant.CURRENT_USER);
    this._utilityService.navigate(UrlConstants.LOGIN);
  }

}
