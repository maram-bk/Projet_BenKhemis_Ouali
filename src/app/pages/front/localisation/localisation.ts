import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-localisation',
  imports: [],
  templateUrl: './localisation.html',
  styleUrl: './localisation.css',
})
export class Localisation implements OnInit{
private http:HttpClient=inject(HttpClient);
API_URL="http://localhost:3000/sites";
private map!: L.Map;
ngOnInit(): void {
    this.initMap();
    this.loadSites();
}
  private initMap(): void {
    this.map = L.map('map').setView([36.8, 10.18], 7); // centré sur la Tunisie

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadSites(): void {
    this.http.get<any[]>(this.API_URL).subscribe(sites => {
      sites.forEach(site => {
        if(site.latitude && site.longitude) {
          L.marker([site.latitude, site.longitude])
            .addTo(this.map)
            .bindPopup(`<b>${site.nom}</b><br>${site.gouvernorat}`);
        }
      });
    }, err => console.error('Erreur API:', err));
  }
}
