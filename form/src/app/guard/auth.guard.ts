import {Injectable} from "@angular/core";
import {CanActivate, Router,   ActivatedRouteSnapshot} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.expectedRole;
      // logged in so return true

      if(expectedRole == undefined || localStorage.getItem("permissions").includes(expectedRole))
      {
      return true;
    }
    else{
      this.router.navigate(['/']);
    }

    this.router.navigate(['/']);
    // not logged in so redirect to login page
    return false;
  }
}
