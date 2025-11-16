import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteArcheologique } from '../models/site-archeologique';


const API_URL = "http://localhost:3000/sites";
@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private readonly http: HttpClient = inject(HttpClient);
  getAllSite(): Observable<SiteArcheologique[]> {
    return this.http.get<SiteArcheologique[]>(API_URL);
  }
  getSiteById(id: string): Observable<SiteArcheologique> {
    return this.http.get<SiteArcheologique>(`${API_URL}/${id}`);
  }
  addSite(s: SiteArcheologique): Observable<SiteArcheologique> {
    return this.http.post<SiteArcheologique>(API_URL, s);
  }
  updateSiteById(id: string, site: SiteArcheologique): Observable<SiteArcheologique> {
    return this.http.put<SiteArcheologique>(`${API_URL}/${id}`, site);
  }
  deleteSiteById(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }



}
