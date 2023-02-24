import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../home/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private api: ApiService, private router:Router) {}
  
  ngOnInit(): void {
    // localStorage.setItem('userLogin', 'true')
    // localStorage.setItem('userLogin', 'false')

    
  }

  search(event: any) {
    let searchKey = event.target.value;
    this.api.searchkey.next(searchKey);
  }
 

  loginCall(){
    if(localStorage.getItem('userLogin') == 'true'){
      this.router.navigateByUrl('home/user')
    }else{
      this.router.navigateByUrl('home/login');
    }
  }

}
