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
      photo: ['', [Validators.required, Validators.pattern(/\.(jpg|jpeg|png|webp)$/i)]],
      prixEntree: ['', [Validators.required, Validators.min(0.1)]],
      horaires: ['8h00 - 17h00', [Validators.required]],
      descriptionCourte: ['', [Validators.required]],
      latitude:['',[Validators.required]],
      longitude:['',[Validators.required]],
      details: this.fb.array([this.createDetail()])
    });
    this.siteForm.get('nom')?.valueChanges.subscribe(value => {
      (this.details.at(0) as FormGroup).get('nomD')?.setValue(value);
    });
    this.siteForm.get('photo')?.valueChanges.subscribe(value => {
      (this.details.at(0) as FormGroup).get('photoD')?.setValue(value);
    });
  }

  createDetail() {
    return this.fb.nonNullable.group({
      nomD: [''],
      photoD: [''],
      dateDecouverte: [''],
      possedeMusee: [false],
      periodeHistorique: ['']
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

  get details(): FormArray {
    return this.siteForm.get('details') as FormArray;
  }

  addDetail() {
    this.details.push(this.createDetail());
  }

  removeDetail(i: number) {
    this.details.removeAt(i);
  }
  onResetForm() {
    this.siteForm.reset({
      nom: '',
      localisation: '',
      gouvernorat: '',
      photo: '',
      prixEntree: '',
      horaires: '',
      descriptionCourte: '',
      latitude:'',
      longitude:'',
      detailForm: {
        nomD: '',
        photoD: '',
        dateDecouverte: '',
        possedeMusee: '',
        periodeHistorique: ''
      }
    });
    this.details.clear();
    this.addDetail();
  }


}
