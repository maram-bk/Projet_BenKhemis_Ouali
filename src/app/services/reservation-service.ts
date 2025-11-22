import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { Observable } from 'rxjs';


const API_URL="http://localhost:3000/reservations";
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly http:HttpClient=inject(HttpClient);
  getAllReservations():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(API_URL);
  }
  deleteReservation(id:string):Observable<void>{
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
