import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts: any = [];
  searchTerm: string = '';

  modalTitle: any;
  modalImage: any;
  modalDescription: any;
  modalPrice: any;
  modalAuthor: any;
  modalDate: any;

  displayNoResultFound = 'none'
  check = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.api.getAllProducts().subscribe(
      (data: any) => {
        this.allProducts = data.products;
      }
    )

    this.api.searchkey.subscribe(
      (data: any) => {
        this.searchTerm = data;
        this.check = data
        this.displayNoResult()
      }
    )

    this.api.noResultFound.subscribe(
      (data: any) => {
        if (data == 1) {
          this.displayNoResultFound = 'block'
        }
        else {
          this.displayNoResultFound = 'none'
        }
      }
    )
  }

  displayNoResult() {
    if (this.check == '') {
      this.displayNoResultFound = 'none'
    }
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


  // modal
  displayStyle = "none";
  openPopup(product: any) {
    this.modalTitle = product.name;
    this.modalImage = product.image
    this.modalAuthor = product.author
    this.modalDescription = product.description
    this.modalDate = product.date;
    this.modalPrice = product.price
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
