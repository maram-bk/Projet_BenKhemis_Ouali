import { Component, inject, OnInit } from '@angular/core';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { SiteService } from '../../../services/site-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  sites: SiteArcheologique[] = [];
  filtered: SiteArcheologique[] = [];
  private readonly siteService: SiteService = inject(SiteService);
  private http: HttpClient = inject(HttpClient);
  searchName = "";
  maxPrix: number | null = null;
  ngOnInit(): void {
    this.siteService.getAllSite().subscribe(
      data => {
        this.sites = data;
        this.filtered = data;
      })
  }
  onFilter() {
    this.filtered = this.sites.filter(site => {
      let byName = this.searchName ? site.nom.toLowerCase().startsWith(this.searchName.toLowerCase()) : true;
      let byPrix = this.maxPrix !== null && this.maxPrix !== undefined ? site.prixEntree <= this.maxPrix : true;
      return byName && byPrix;
    })
  }
  onClearFilter() {
    this.searchName = '';
    this.maxPrix = null;
    this.filtered = [...this.sites];
  }

}
