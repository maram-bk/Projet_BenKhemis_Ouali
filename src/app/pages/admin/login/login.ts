import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  adminForm!: FormGroup;
  message:string = '';
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  ngOnInit(): void {
    this.adminForm = this.fb.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.maxLength(8)]],
    })
  }
  onSubmit() {
    let user = this.adminForm.get('username')?.value;
    let pwd = this.adminForm.get('password')?.value;
    this.authService.logIn(user, pwd).subscribe(
      data => {
        if (data)
          this.router.navigate(['/admin/dashboard']);
        else
          this.message = "Mot de pass ou Username est incorrect"
      }
    )
  }
  get getUser(){
    return this.adminForm.get('username');
  }
  public requiredUser(){
    return this.getUser?.errors?.['required'] && this.getUser.dirty;
  }

  get getMdp(){
    return this.adminForm.get('password');
  }
}
