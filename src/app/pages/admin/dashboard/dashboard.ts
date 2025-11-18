import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { SiteService } from '../../../services/site-service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  readonly authService: AuthService = inject(AuthService);
  readonly router: Router = inject(Router);
  sites: SiteArcheologique[] = [];
  readonly siteService: SiteService = inject(SiteService);
  ngOnInit(): void {
    this.siteService.getAllSite().subscribe(
      data => this.sites = data
    )
  }
  deleteSite(id: string) {
    this.siteService.deleteSiteById(id).subscribe(
      data => {
        this.sites = this.sites.filter(e => e.id != id)
      })
  }
  onDisconnect() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
