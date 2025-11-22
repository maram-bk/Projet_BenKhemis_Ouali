import { Component, inject } from '@angular/core';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SiteService } from '../../../services/site-service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-reservation',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css',
})
export class Reservation {
  sites: SiteArcheologique[] = [];
  private readonly fb: FormBuilder = inject(FormBuilder);
  reserveForm!: FormGroup;
  private readonly siteService: SiteService = inject(SiteService);
  private readonly http:HttpClient=inject (HttpClient);
  private router:Router=inject(Router);
  ngOnInit() {
    this.reserveForm = this.fb.nonNullable.group({
      nom: [''],
      email: [''],
      tel: [''],
      site: [''],
      date: [''],
      personnes: [1]
    })
    this.siteService.getAllSite().subscribe(
      data => this.sites = data
    );
  }

  onSubmit() {
    console.log('Réservation envoyée :', this.reserveForm.value);
    this.http.post('http://localhost:3000/reservations', this.reserveForm.value).subscribe(() => {
      alert('Réservation Faite !');
      this.onResetForm();
      this.router.navigate(['/front/list']);
    });

  }
  onResetForm() {
    this.reserveForm.reset({
      nom: '',
      email: '',
      tel: '',
      site: '',
      date: '',
      personnes: 1
    })
  }
}
