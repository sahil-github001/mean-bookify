import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-fiction',
  templateUrl: './fiction.component.html',
  styleUrls: ['./fiction.component.css']
})
export class FictionComponent implements OnInit {

  fiction: any = [];

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

    this.getAllFiction()

    this.api.searchkey.subscribe(
      (data: any) => {
        this.check = data
        this.displayAllProduct()
      }
    )

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

  getAllFiction() {
    this.api.getAllProducts().subscribe(
      (data:any) => {
        data.products.map((products:any) => {
          if(products.category == 'Fiction'){this.fiction.push(products)}
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
      alert('please Login')
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


