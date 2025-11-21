import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { SiteArcheologique } from '../models/site-archeologique';


const API_URL = "http://localhost:3000/admins";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private site: SiteArcheologique[] = [];
  logIn(username: string, pwd: string): Observable<boolean> {
    return this.http.get<any[]>(API_URL).pipe(
      map(admin => {
        let connected = admin.find(a => a.username === username && a.password === pwd);
        if (connected) {
          localStorage.setItem("state", "connected");
          //hdhi pour que les deux nconnectiw b different compte
          localStorage.setItem("adminId",connected.id);
          return true;
        }
        localStorage.setItem("state", "disconnected");
        return false;
      })
    )
  }
  logout() {
    localStorage.setItem("state", "disconnected");
    localStorage.removeItem("adminId");
  }
  isLogged(): boolean {
    return localStorage.getItem("state") === "connected";
  }

}
