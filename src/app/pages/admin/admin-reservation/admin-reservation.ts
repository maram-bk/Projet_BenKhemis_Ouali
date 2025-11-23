import { Component, inject, OnInit } from '@angular/core';
import { Reservation } from '../../../models/reservation';
import { ReservationService } from '../../../services/reservation-service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-reservation',
  imports: [DatePipe],
  templateUrl: './admin-reservation.html',
  styleUrl: './admin-reservation.css',
})
export class AdminReservation implements OnInit {
  reservations: Reservation[] = [];
  private readonly reservationService: ReservationService = inject(ReservationService);
  private router:Router=inject(Router);
  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(
      data => this.reservations = data
    )
  }
  deleteReservation(id: string) {
    if (confirm("Supprimer cette réservation ? ")) {
      this.reservationService.deleteReservation(id).subscribe(() => {
        this.reservationService.getAllReservations().subscribe(
          data => this.reservations = data
        )
      })
    }
  }
  goBack(){
    this.router.navigate(['/admin/dashboard']);
  }
}
