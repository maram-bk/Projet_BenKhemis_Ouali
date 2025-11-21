import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
      nom: [this.site.nom],
      localisation: [this.site.localisation],
      gouvernorat: [this.site.gouvernorat],
      photo: [this.site.photo],
      prixEntree: [this.site.prixEntree],
      descriptionCourte: [this.site.descriptionCourte],
      horaires: [this.site.horaires],
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
}
