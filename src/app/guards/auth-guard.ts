import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 private router = inject(Router); // ← OK ici

  canActivate(): boolean {
    const stateConnexion = localStorage.getItem('state');
    if (stateConnexion === 'connected') {
      return true;
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
  }
}
