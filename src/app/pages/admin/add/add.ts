import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { SiteService } from '../../../services/site-service';

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add implements OnInit {
archeologigue:SiteArcheologique[]=[]
private readonly siteService:SiteService=inject(SiteService);
siteForm!: FormGroup;
fb:FormBuilder=inject(FormBuilder);
ngOnInit(): void {
this.siteForm = this.fb.group({
  id: ['', Validators.required],
  nom: ['', Validators.required],
  localisation: ['', Validators.required],
  gouvernorat: ['', Validators.required],
  photo: [''],
  prixEntree: [0, Validators.required],
  horaires: [''],
  descriptionCourte: ['', Validators.maxLength(150)],
  descriptionDetaillee: this.fb.array([]),
  comments: this.fb.array([])
});

  }
get descriptionDetaillee(): FormArray {
  return this.siteForm.get('descriptionDetaillee') as FormArray;
}

get comments(): FormArray {
  return this.siteForm.get('comments') as FormArray;
}
createDetail(): FormGroup {
  const siteNom = this.siteForm.get('nom')?.value || '';
  const sitePhoto = this.siteForm.get('photo')?.value || '';
  
  return this.fb.group({
    nom: [siteNom],
    photo: [sitePhoto],
    dateDecouverte: [''],
    possedeMusee: [false],
    periodeHistorique: ['']
  });
}

addDetail() {
  this.descriptionDetaillee.push(this.createDetail());
}

removeDetail(i: number) {
  this.descriptionDetaillee.removeAt(i);
}

createComment(): FormGroup {
  return this.fb.group({
    nom: [''],
    message: [''],
    note: [1, [Validators.min(1), Validators.max(5)]],
    date: ['']
  });
}

addComment() {
  this.comments.push(this.createComment());
}

removeComment(i: number) {
  this.comments.removeAt(i);
}
successMessage: string = "ereur d'ajouter";
onSubmit() {
if (this.siteForm.invalid) {
      alert(this.successMessage); 
      return;
    }

    const site:SiteArcheologique= this.siteForm.value;

    this.siteService.addSite(site).subscribe({
      next: (res) => {
        this.successMessage = 'Site ajouté avec succès !';
        this.archeologigue.push(res);
        alert(this.successMessage); 
        this.siteForm.reset();
        this.descriptionDetaillee.clear();
        this.comments.clear();
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l\'enregistrement du site.');
      }
    });
  }

}
