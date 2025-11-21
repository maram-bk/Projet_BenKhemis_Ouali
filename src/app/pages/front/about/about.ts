import { Component, inject } from '@angular/core';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { FormBuilder, FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { SiteService } from '../../../services/site-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  imports: [ReactiveFormsModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

}
