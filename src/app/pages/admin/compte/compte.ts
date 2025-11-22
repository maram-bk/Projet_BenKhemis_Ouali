import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { Admin } from '../../../models/admin';

@Component({
  selector: 'app-compte',
  imports: [RouterModule],
  templateUrl: './compte.html',
  styleUrl: './compte.css',
})
export class Compte {
  admin: Admin| null =null;
  http = inject(HttpClient);
  API_URL = 'http://localhost:3000/admins';
  adminId = localStorage.getItem("adminId");
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  ngOnInit() {
    this.http.get<Admin>(`${this.API_URL}/${this.adminId}`).subscribe(data => {
      this.admin = data;
    });
  }

  onBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}
