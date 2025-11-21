import { Component, inject } from '@angular/core';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SiteService } from '../../../services/site-service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-reservation',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css',
})
export class Reservation {
  sites: SiteArcheologique[] = [];
  success = false;
  private readonly fb: FormBuilder = inject(FormBuilder);
  reserveForm!: FormGroup;
  private readonly siteService: SiteService = inject(SiteService);
  private readonly http:HttpClient=inject (HttpClient);
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
      this.success = true;
      this.onResetForm();
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
