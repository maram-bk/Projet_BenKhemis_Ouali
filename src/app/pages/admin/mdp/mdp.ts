import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get oldPassword() {
    return this.passwordForm.get('oldPassword');
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  changePassword() {
    let oldPwd = this.passwordForm.value.oldPassword;
    let newPwd = this.passwordForm.value.newPassword;
    this.http.get<any>(`${this.API_URL}/${this.adminId}`).subscribe(admin => {

      if (admin.password !== oldPwd) {
        
        this.oldPasswordIncorrect = true;
        return;
      }

      this.http.patch(`${this.API_URL}/${this.adminId}`, { password: newPwd })
        .subscribe(() => {
          alert("Mot de passe modifié avec succès !");
          this.passwordForm.reset();
          this.oldPasswordIncorrect = false;
        });
  })}
}
