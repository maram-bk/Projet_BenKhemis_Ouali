import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  mail = 'ml@gmail.com';
  mdp = '1234';
  constructor (private router : Router){}
  logIn(email:string , pwd:string):boolean{
    if(email===this.mail && pwd===this.mdp){
      localStorage.setItem('isConnected','true');
      localStorage.setItem('mail',email);
      return true;
    }
    return false;
  }
  logOut() : void{
    localStorage.removeItem('isConnected');
    localStorage.removeItem('mail');
    this.router.navigate(['admin/login']);
  }
  isAuth():boolean{
    return localStorage.getItem('isConnected')==='true';
  }
}
