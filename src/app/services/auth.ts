import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  adminEmail = 'ml@gmail.com';
  adminPassword = '1234';
  constructor (private router : Router){}
  logIn(email:string , password:string){
    if(email===this.adminEmail && password===this.adminPassword){
      localStorage.setItem('isLoggedIn','true');
      localStorage.setItem('adminEmail',email);
      return true;
    }
    return false;
  }
  logOut(){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminEmail');
    this.router.navigate(['/admin/login']);
  }
  isAuth(){
    return localStorage.getItem('isLoggedIn')==='true';
  }
  getAdminEmail(){
    return localStorage.getItem('adminEmail');
  }
}
