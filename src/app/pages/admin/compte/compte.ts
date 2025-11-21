import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-compte',
  imports: [RouterModule],
  templateUrl: './compte.html',
  styleUrl: './compte.css',
})
export class Compte {
  admin: any = {};
  http = inject(HttpClient);
  API_URL = 'http://localhost:3000/admins';
  adminId = '1';
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  ngOnInit() {
    this.http.get(`${this.API_URL}/${this.adminId}`).subscribe(data => {
      this.admin = data;
    });
  }
  onDisconnect() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  onBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}
