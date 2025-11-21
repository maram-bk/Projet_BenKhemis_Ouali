import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
  private router:Router=inject(Router);
onBack(){
  this.router.navigate(['/front/list']);
}
}
