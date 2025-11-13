import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-auth-guard',
  imports: [],
  templateUrl: './auth-guard.html',
  styleUrl: './auth-guard.css',
})
export class AuthGuard implements CanActivate{
  constructor(private auth: Auth,private router:Router){}
  canActivate(): boolean {
    if(this.auth.isAuth()){
      return true;
    }
    this.router.navigate(['/admin/login']);
    return false;
  }
  

}
