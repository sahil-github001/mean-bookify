import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: any;
  lastName: any;
  email: any;
  password: any;



  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      this.api.register(this.registerForm.value.firstName, this.registerForm.value.lastName,
        this.registerForm.value.email, this.registerForm.value.password).subscribe(
          (result: any) => {
            alert(result.message);
            this.router.navigateByUrl('home/login');
          },
          (result: any) => {
            alert(result.error.message);
            window.location.reload();
          }
        )
    }
  }





  
}
