import {Injectable} from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SystemConstant } from '../../core/common/system.constant';
import { UrlConstants } from '../../core/common/url.constant';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _router: Router) {

    }

    canActivate(activateRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
        if (localStorage.getItem(SystemConstant.CURRENT_USER)) {
            return true;
        } else {
            this._router.navigate([UrlConstants.LOGIN], {
                queryParams: {
                    returnUrl: routerState.url
                }
            });
        }
        return false;
    }
}