import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bestSeller: any = [];
  topFiction: any = [];
  topNewArrival: any = [];

  modalTitle: any;
  modalImage: any;
  modalDescription: any;
  modalPrice: any;
  modalAuthor: any;
  modalDate: any;
  modalDiscount: any;

  displayHome = 'block'
  allProductDisplay = '';
  check = '';
  

  constructor(private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts()
    

    this.api.searchkey.subscribe(
      (data: any) => {
        this.check = data
        this.displayAllProduct()
      }
    )
  }

  getAllProducts(){
    this.api.getAllProducts().subscribe(
      (data:any) => {
        data.products.map((products:any) => {
          if(products.category2 == 'Top Best Sellers'){ this.bestSeller.push(products) }
          if(products.category2 == 'Top Fiction'){ this.topFiction.push(products) }
          if(products.category2 == 'Top New Arrival'){ this.topNewArrival.push(products) }
        })
      }
    )
  }



  addToWishlist(product: any) {
    if(localStorage.getItem('userLogin') == 'true'){
      const email = localStorage.getItem('currentEmail');
      this.api.addWishToUser(product, email).subscribe(
        (result:any) => {
          alert(result.message)
        },
        (result:any) => {
          alert(result.error.message)
        }
      )
    }else{
      alert('please Login')
    }
  }

  addToCart(product: any) {
    if(localStorage.getItem('userLogin') == 'true'){
      const email = localStorage.getItem('currentEmail');
      this.api.addCartToUser(product, email).subscribe(
        (result:any) => {
          alert(result.message)
        },
        (result:any) => {
          alert(result.error.message)
        }
      )
    }else {
      alert('please Login');
    }
  }






  displayAllProduct() {
    if (this.check == '') {
      this.allProductDisplay = "none"
      this.displayHome = 'block'
    }
    else {
      this.allProductDisplay = "block"
      this.displayHome = 'none'
    }
  }

  // modal
  displayStyle = "none";
  openPopup(product: any) {
    this.modalTitle = product.name;
    this.modalImage = product.image
    this.modalAuthor = product.author
    this.modalDescription = product.description
    this.modalDate = product.date;
    this.modalPrice = product.price
    this.modalDiscount = product.discount
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }


}
