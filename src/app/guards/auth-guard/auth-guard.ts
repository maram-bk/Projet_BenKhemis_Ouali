import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-auth-guard',
  imports: [],
  templateUrl: './auth-guard.html',
  styleUrl: './auth-guard.css',
})
export class AuthGuard implements CanActivate {
  private readonly auth: Auth = inject(Auth);
  private readonly router: Router = inject(Router);
  canActivate() {
    if (!this.auth.isAuth()) {
      this.router.navigate(['/admin/login']);
      return true;
    }
    return false;
  }


}
