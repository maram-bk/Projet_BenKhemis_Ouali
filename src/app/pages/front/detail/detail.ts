import { Component, inject, OnInit } from '@angular/core';
import { SiteArcheologique } from '../../../models/site-archeologique';
import { ActivatedRoute, Route, Router} from '@angular/router';
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
  isOpen: boolean = false;
  openAt: string = '';
  closeAt: string = '';
  showComment: boolean = false;
  checkOpenStatus() {
    if (!this.site || !this.site.horaires) return;
    let [openStr, closeStr] = this.site.horaires.split('-').map(s => s.trim());
    let now = new Date();
    let today = new Date();
    //extraire du opening time
    let [openHour, openMin] = openStr.replace('h', ':').split(':').map(Number);
    //extraire du closing time
    let [closeHour, closeMin] = closeStr.replace('h', ':').split(':').map(Number);
    let openTime = new Date(today);
    openTime.setHours(openHour, openMin, 0, 0);
    let closeTime = new Date(today);
    closeTime.setHours(closeHour, closeMin, 0, 0);
    this.isOpen = now >= openTime && now <= closeTime;
    this.openAt = openStr;
    this.closeAt = closeStr;
  }
  ngOnInit(): void {
    this.commentForm = this.fb.nonNullable.group({
      nom: [''],
      message: [''],
      note: [0]
    });
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.siteService.getSiteById(id).subscribe(s => {
          this.site = s;
          this.checkOpenStatus();
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
    if (this.editingIndex >= 0) {
      this.site.comments[this.editingIndex] = comment;
      this.editingIndex = -1;
    }
    else {
      this.site.comments.push(comment);
    }
    this.siteService.updateSiteById(this.site.id, this.site).subscribe(() => {
      this.commentForm.reset({
        nom: '',
        message: '',
        note: 5
      })
    })
    this.showComment = false;

  }
  goBack() {
    this.router.navigate(['/front/list']);
  }

  onShowComments() {
    this.showComment = !this.showComment;
  }
  editingIndex = 0;
  onEditComment(index: number) {
    const comment = this.site.comments![index];
    this.commentForm.patchValue({
      nom: comment.nom,
      message: comment.message,
      note: comment.note
    });
    this.editingIndex = index;
    this.showComment = true;
  }

  onDeleteComment(index: number) {
    if (confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
      this.site.comments!.splice(index, 1);
      this.siteService.updateSiteById(this.site.id, this.site).subscribe(()=>{
        alert("commentaire supprimé !");
      }

      )
    }
  }

}
