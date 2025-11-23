import { Component, Input } from '@angular/core';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-site-card',
  imports: [RouterLink,DatePipe],
  templateUrl: './site-card.html',
  styleUrl: './site-card.css',
})
export class SiteCard {
@Input() site!:SiteArcheologique;
}
