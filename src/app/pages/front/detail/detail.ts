import { Component, inject, OnInit } from '@angular/core';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SiteService } from '../../../services/site-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StarcommentPipe } from '../../../starcomment-pipe';

@Component({
  selector: 'app-detail',
  imports: [ReactiveFormsModule, DatePipe, StarcommentPipe],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail implements OnInit {
  site!: SiteArcheologique;
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly siteService: SiteService = inject(SiteService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  commentForm!: FormGroup;
  ngOnInit(): void {
    this.commentForm = this.fb.nonNullable.group({
      nom: [''],
      message: [''],
      note: [0]
    });
    this.route.params.subscribe(params => {
      const id = params['id']; // get the id from the URL
      if (id) {
        this.siteService.getSiteById(id).subscribe(s => {
          this.site = s;
        });
      }
    });

  }
  onAddComment() {
    if (!this.site) return;
    let comment = {
      nom: this.commentForm.value.nom.trim() !== '' ? this.commentForm.value.nom : 'Anonym',
      message: this.commentForm.value.message,
      note: this.commentForm.value.note,
      date: new Date().toISOString().split('T')[0]
    };
    if (!this.site.comments) {
      this.site.comments = [];
    }
    this.site.comments.push(comment);
    this.siteService.updateSiteById(this.site).subscribe(() => {
      this.commentForm.reset({
        nom: '',
        message: '',
        note: 5
      })
    })
  }
  onBack() {
    this.router.navigate(['/front/list']);
  }


//  getStatus(): 'Ouvert' | 'Fermé' {
//   if (!this.site?.horaires) return 'Fermé';

//   // remove spaces and split by dash
//   const [start, end] = this.site.horaires.replace(/\s/g,'').split('-'); // ["08h00","18h00"]

//   const now = new Date();

//   // parse hours and minutes from "08h00"
//   const [startHour, startMin] = start.split('h').map(Number);
//   const [endHour, endMin] = end.split('h').map(Number);

//   const startTime = new Date();
//   startTime.setHours(startHour, startMin, 0, 0);

//   const endTime = new Date();
//   endTime.setHours(endHour, endMin, 0, 0);

//   return now >= startTime && now <= endTime ? 'Ouvert' : 'Fermé';
// }



}
