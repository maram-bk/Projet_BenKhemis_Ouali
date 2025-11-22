import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../../models/admin';

@Component({
  selector: 'app-mdp',
  imports: [ ReactiveFormsModule],
  templateUrl: './mdp.html',
  styleUrl: './mdp.css',
})
export class Mdp {
  passwordForm!: FormGroup;
  oldPasswordIncorrect: boolean = false;
  API_URL = 'http://localhost:3000/admins';
  adminId = '1';
 private fb:FormBuilder=inject(FormBuilder);
  private http: HttpClient=inject(HttpClient);
private router:Router=inject(Router);
  ngOnInit(): void {
    this.passwordForm = this.fb.nonNullable.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.maxLength(8)]]
    });
  }

  get oldPassword() {
    return this.passwordForm.get('oldPassword');
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  public formatMdp(){
    return this.newPassword?.errors?.['maxlength'] && this.newPassword?.dirty
  }

  changePassword() {
    let oldPwd = this.passwordForm.value.oldPassword;
    let newPwd = this.passwordForm.value.newPassword;
    this.http.get<Admin>(`${this.API_URL}/${this.adminId}`).subscribe(admin => {

      if (admin.password !== oldPwd) {
        this.oldPasswordIncorrect = true;
        return;
      }

      this.http.patch<Admin>(`${this.API_URL}/${this.adminId}`, { password: newPwd })
        .subscribe(() => {
          alert("Mot de passe modifié avec succès !");
          this.passwordForm.reset();
          this.oldPasswordIncorrect = false;
          this.router.navigate(['/admin/login'])
        });
  })}
}
