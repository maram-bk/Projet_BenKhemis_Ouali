import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { SiteService } from '../../../services/site-service';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit implements OnInit {
  editForm!: FormGroup;
  id!: string;
  site!: SiteArcheologique;
  fb: FormBuilder = inject(FormBuilder);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  siteService: SiteService = inject(SiteService);

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.siteService.getSiteById(this.id).subscribe(site => {
      this.site = site;
      this.initForm();
    }

    );
  }
  initForm() {
    this.editForm = this.fb.group({
      nom: [this.site.nom, [Validators.required]],
      localisation: [this.site.localisation, [Validators.required]],
      gouvernorat: [this.site.gouvernorat, [Validators.required]],
      photo: [this.site.photo, [Validators.required, Validators.pattern('^.+\\.(jpg|jpeg|png|webp)$')]],
      prixEntree: [this.site.prixEntree, [Validators.required, Validators.min(0.1)]],
      descriptionCourte: [this.site.descriptionCourte, [Validators.required]],
      horaires: [this.site.horaires, [Validators.required, Validators.pattern('^([0-9]{1,2})h([0-5][0-9])\\s-\\s([0-9]{1,2})h([0-5][0-9])$')]],
      latitude: [this.site.latitude, [Validators.required]],
      longitude: [this.site.longitude, [Validators.required]],
      siteProtege: [this.site.siteProtege, [Validators.required]],
      dateAjout: [this.site.dateAjout, [Validators.required]],
      descriptionDetaillee: this.fb.array(
        this.site.descriptionDetaillee?.map(d => this.fb.group({
          nom: [d.nom],
          photo: [d.photo],
          dateDecouverte: [d.dateDecouverte],
          possedeMusee: [d.possedeMusee],
          periodeHistorique: [d.periodeHistorique]
        })) || []
      ),
      comments: this.fb.array(
        this.site.comments?.map(c => this.fb.group({
          nom: [c.nom],
          message: [c.message],
          note: [c.note],
          date: [c.date]
        })) || []
      )
    });
  }
  get comments() {
    return this.editForm.get('comments') as FormArray;
  }
  removeComment(index: number) {
    this.comments.removeAt(index);
  }
  get descriptionDetaillee() {
    return this.editForm.get('descriptionDetaillee') as FormArray;
  }

  addDetail() {
    this.descriptionDetaillee.push(this.fb.group({
      nom: [''],
      photo: [''],
      dateDecouverte: [''],
      possedeMusee: [false],
      periodeHistorique: ['']
    }));
  }


  removeDetail(index: number) {
    this.descriptionDetaillee.removeAt(index);
  }
  onSubmit() {
    if (this.editForm.valid) {
      let updatedSite: SiteArcheologique = {
        ...this.site,
        ...this.editForm.value
      };

      this.siteService.updateSiteById(this.id, updatedSite).subscribe(() => {
        alert("Site modifié avec succès !");
        this.router.navigate(['/admin/dashboard/']);
      });
    }
  }

  get getNom() {
    return this.editForm.get('nom');
  }
  get getPhoto() {
    return this.editForm.get('photo');
  }
  get getLocalisation() {
    return this.editForm.get('localisation');
  }
  get getGouvernorat() {
    return this.editForm.get('gouvernorat');
  }
  get getPrixEntree() {
    return this.editForm.get('prixEntree');
  }
  get getHoraires() {
    return this.editForm.get('horaires');
  }
  get getDescCourte() {
    return this.editForm.get('descriptionCourte');
  }
  get getLatitude() {
    return this.editForm.get('latitude');
  }
  get getLongitude() {
    return this.editForm.get('longitude');
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
}
