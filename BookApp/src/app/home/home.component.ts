import { Component, OnInit } from '@angular/core';
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

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.getBestSellers()
    this.getTopFiction()
    this.getNewArrival()

    this.api.searchkey.subscribe(
      (data: any) => {
        this.check = data
        this.displayAllProduct()
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
      this.api.addToWishlist(product).subscribe(
        (result: any) => {
          alert(result.message);
        },
        (result: any) => {
          alert(result.error.message)
        }
      )
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
      this.api.addToCart(product).subscribe(
        (result: any) => {
          alert(result.message);
        },
        (result: any) => {
          alert(result.error.message)
        }
      )
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

  getBestSellers() {
    this.api.getTopBestSellers().subscribe(
      (data: any) => {
        this.bestSeller = data.products;
      }
    )
  }

  getTopFiction() {
    this.api.getTopFiction().subscribe(
      (data: any) => {
        this.topFiction = data.products;
      }
    )
  }

  getNewArrival() {
    this.api.getTopNewArrival().subscribe(
      (data: any) => {
        this.topNewArrival = data.products;
      }
    )
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
