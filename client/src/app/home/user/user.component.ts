import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  firstName:any;
  lastName:any;
  email:any;

  constructor(private api:ApiService, private router:Router){
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('currentEmail')
  }

  logOut(){
    localStorage.removeItem('userLogin');
    localStorage.removeItem('currentEmail');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    this.router.navigateByUrl('');
  }
}
