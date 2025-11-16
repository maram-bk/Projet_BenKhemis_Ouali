import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  // fb:FormBuilder=inject(FormBuilder);
  // adminForm!:FormGroup;
  // ngOnInit(): void {
  //   this.adminForm=this.fb.nonNullable.group({
  //   username:["",Validators.required] ,
  //   password:["",Validators.required  ]

  //   })}
// onResetForm() {

// }
// onsubmit() {
// let a:admin=this.adminForm.value;
// }
private readonly fb:FormBuilder =inject(FormBuilder);
adminForm!:FormGroup;
error = '';

private readonly auth:Auth = inject(Auth);
private readonly router:Router = inject (Router);
ngOnInit(): void {
  this.adminForm=this.fb.nonNullable.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]],
  })
}
onLogin(){
  let email = this.adminForm.get('email')?.value;
  let password = this.adminForm.get('password')?.value;
  if(this.auth.logIn(email,password)){
    this.router.navigate(['/admin/dashboard']);
  }
}
}
