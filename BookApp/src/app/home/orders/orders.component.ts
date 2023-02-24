import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  email:any;
  orderList = [];

  displayNoOrder = 'none'

    constructor(private api: ApiService, private router: Router){}
  ngOnInit(): void {
    if(localStorage.getItem('userLogin') == 'true'){
      this.email = localStorage.getItem('currentEmail');
    }
    else{
      alert('please login first');
      this.router.navigateByUrl('home/login');
    }
    this.getOrderList()
  }

    getOrderList(){
      this.api.getOrderFromUser(this.email).subscribe(
        (result:any) => {
          this.orderList = result.orderList
          if(this.orderList.length == 0){
            this.displayNoOrder = 'block'
          }
          else{
            this.displayNoOrder = 'none'
          }
          // console.log(this.orderList[0]['date'])
        },
        (result:any) => {
          result.error.message
        }
      )
    }
  
}
