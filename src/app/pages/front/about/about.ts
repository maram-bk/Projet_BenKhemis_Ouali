import { Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { SiteService } from '../../../services/site-service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About implements OnInit {
  private siteService: SiteService = inject(SiteService);
  private map!: L.Map; //variable qui contient la carte leaflet

  ngOnInit(): void {
    //on crée la carte dans le div (html)
    this.map = L.map('map').setView([36.8, 10.18], 7); //centre sur tunis 36.8,10.18 et zoom=7
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors' //api OpenStreetMap
    }).addTo(this.map);
    this.map.whenReady(() => {
      this.map.invalidateSize(); //corrige taille du carte
    });
    this.loadSites(); //ajouter marquer du site
  }
  private loadSites() {
    this.siteService.getAllSite().subscribe(sites => {
      sites.forEach(site => {
        if (site.latitude && site.longitude) { //si il a des coordonnées
          // creation marqueur personnalisé
          const iconHtml = `
          <div class="custom-marker">
            <span>${site.nom}</span>
          </div>
        `; //rectangle avec nom du site
          const customIcon = L.divIcon({
            html: iconHtml,
            className: 'marker-wrapper',
            iconSize: undefined,
            iconAnchor: [25, 100]
          }); //transformer le html on une icon leaflet
          L.marker([site.latitude, site.longitude], { icon: customIcon }) //placement du marquer
            .addTo(this.map) //ajoute le marqueur dans la carte
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
