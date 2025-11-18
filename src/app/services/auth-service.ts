import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logIn(username: string, pwd: string): Observable<boolean> {
    let connected = username === "admin" && pwd === "pwd";
    if (connected) {
      localStorage.setItem("state", "connected");
    }
    else
      localStorage.setItem("state", "disconnected");
    return of(connected);
  }
  logout() {
    localStorage.setItem("state", "disconnected");
  }
}
