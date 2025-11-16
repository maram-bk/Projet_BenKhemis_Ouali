import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  fb:FormBuilder=inject(FormBuilder);
  adminForm!:FormGroup;
  ngOnInit(): void {
    this.adminForm=this.fb.nonNullable.group({
    username:["",Validators.required] ,
    password:["",Validators.required  ]

    })}
// onResetForm() {

// }
// onsubmit() {
// let a:admin=this.adminForm.value;
// }

  
}
