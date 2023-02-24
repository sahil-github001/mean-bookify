import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  password: string = '';

  constructor(private api: ApiService, private router: Router) { }

  login() {
    const password = this.password
    this.api.loginAdmin(password).subscribe(
      (result: any) => {
        alert(result.message)
        this.router.navigateByUrl('home/admin-dashboard')
      },
      (result: any) => {
        alert(result.error.message)
      }
    )
  }
}
