import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  constructor(private router:Router){
   
  }
  ngOnInit(): void {

  }

  orderList(){
    if(localStorage.getItem('userLogin') == 'true'){
      this.router.navigateByUrl('home/orders')
    }
    else{
      this.router.navigateByUrl('home/login')
    }
  }
}
