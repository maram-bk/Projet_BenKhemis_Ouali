import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About implements OnInit {
  private http: HttpClient = inject(HttpClient);
  API_URL = "http://localhost:3000/sites";
  private map!: L.Map;

  ngOnInit(): void {
    this.initMap();
    this.map.whenReady(() => {
      this.map.invalidateSize();
    });
    this.loadSites();
  }
  private initMap() {
    this.map = L.map('map').setView([36.8, 10.18], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }
  private loadSites() {
    this.http.get<any[]>(this.API_URL).subscribe(sites => {
      sites.forEach(site => {
        if (site.latitude && site.longitude) {
          // Create custom marker
          const iconHtml = `
          <div class="custom-marker">
            <span>${site.nom}</span>
          </div>
        `;
          const customIcon = L.divIcon({
            html: iconHtml,
            className: 'marker-wrapper',
            iconSize: undefined,
            iconAnchor: [25, 100]
          });
          L.marker([site.latitude, site.longitude], { icon: customIcon })
            .addTo(this.map)
            .bindPopup(`<div style="text-align:center">
              <img src="${site.photo}" width="150" style="border-radius:8px;">
              <h5 style="margin-top:8px">${site.nom}</h5>
              <p>${site.gouvernorat}</p>
                    <a href="/front/detail/${site.id}" style="text-decoration:none; color:blue;">Voir détails</a>
            </div>`);
        }
      })
    })
  }
}
