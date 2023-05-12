import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.api.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (result: any) => {
          alert(result.message);
          localStorage.setItem('userLogin', 'true');
          localStorage.setItem('currentEmail', result.email);
          localStorage.setItem('firstName', result.firstName);
          localStorage.setItem('lastName', result.lastName);
          this.router.navigateByUrl('');
        },
        (result: any) => {
          alert(result.error.message);
          window.location.reload();
        }
      )
    }
  }


}
