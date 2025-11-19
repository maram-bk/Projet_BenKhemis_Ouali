import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { SiteService } from '../../../services/site-service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add implements OnInit {
  private readonly siteService: SiteService = inject(SiteService);
  private readonly fb: FormBuilder = inject(FormBuilder);
  siteForm!: FormGroup;
  sites: SiteArcheologique[] = [];
  private readonly router: Router = inject(Router);
  ngOnInit(): void {
    this.siteForm = this.fb.nonNullable.group({
      nom: ['', [Validators.required]],
      localisation: ['', [Validators.required]],
      gouvernorat: ['', [Validators.required]],
      photo: ['', [Validators.required, Validators.pattern('/\.(jpg|jpeg|png|webp)$/i')]],
      prixEntree: ['', [Validators.required, Validators.min(0.1)]],
      horaires: ['8h00 - 17h00', [Validators.required]],
      descriptionCourte: ['', [Validators.required]],
      detailForm: this.fb.nonNullable.group({
        nom: [''],
        photo: [''],
        dateDecouverte: [''],
        possedeMusee: [''],
        periodeHistorique: ['']
      })
    })
  }
  onSubmit() {
    this.siteService.addSite(this.siteForm.value).subscribe(
      data => {
        this.sites.push(data);
        console.log('reussie');
        this.router.navigate(['/admin/dashboard'])
      }
    )
  }

  get detail() {
    return this.siteForm.get('descriptionDetaillee') as FormGroup;
  }

  onResetForm() {
    this.siteForm.reset({
      nom: [''],
      localisation: [''],
      gouvernorat: [''],
      photo: [''],
      prixEntree: [''],
      horaires: [''],
      descriptionCourte: [''],
      detailForm: {
        nom: [''],
        photo: [''],
        dateDecouverte: [''],
        possedeMusee: [''],
        periodeHistorique: ['']
      }
    })
  }


}
