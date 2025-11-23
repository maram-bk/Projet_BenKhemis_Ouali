import { Component, Input } from '@angular/core';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-card',
  imports: [RouterLink],
  templateUrl: './site-card.html',
  styleUrl: './site-card.css',
})
export class SiteCard {
@Input() site!:SiteArcheologique;
}
