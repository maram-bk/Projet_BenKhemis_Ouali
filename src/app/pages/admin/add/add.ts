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
      photo: ['', [Validators.required, Validators.pattern('^.+\\.(jpg|jpeg|png|webp)$')]],
      prixEntree: ['', [Validators.required, Validators.min(0.1)]],
      horaires: ['8h00 - 17h00', [Validators.required, Validators.pattern('^([0-9]{1,2})h([0-5][0-9])\\s-\\s([0-9]{1,2})h([0-5][0-9])$')]],
      descriptionCourte: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      siteProtege: [false],
      dateAjout: [new Date()],
      details: this.fb.array([])
    });
    this.addDetail();
    this.siteForm.get('nom')?.valueChanges.subscribe(value => {
      (this.details.at(0) as FormGroup).get('nomD')?.setValue(value);
    });
    this.siteForm.get('photo')?.valueChanges.subscribe(value => {
      (this.details.at(0) as FormGroup).get('photoD')?.setValue(value);
    });
  }
  get getNom() {
    return this.siteForm.get('nom');
  }
  get getPhoto() {
    return this.siteForm.get('photo');
  }
  get getLocalisation() {
    return this.siteForm.get('localisation');
  }
  get getGouvernorat() {
    return this.siteForm.get('gouvernorat');
  }
  get getPrixEntree() {
    return this.siteForm.get('prixEntree');
  }
  get getHoraires() {
    return this.siteForm.get('horaires');
  }
  get getDescCourte() {
    return this.siteForm.get('descriptionCourte');
  }
  get getLatitude() {
    return this.siteForm.get('latitude');
  }
  get getLongitude() {
    return this.siteForm.get('longitude');
  }
  public formatPhoto() {
    return this.getPhoto?.errors?.['pattern'] && this.getPhoto?.dirty;
  }

  public formatHoraires() {
    return this.getHoraires?.errors?.['pattern'] && this.getHoraires?.dirty;
  }
  public minPrix() {
    return this.getPrixEntree?.errors?.['min'] && this.getPrixEntree?.dirty;
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
      latitude: '',
      longitude: '',
      siteProtege: false,
      dateAjout: '',
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
