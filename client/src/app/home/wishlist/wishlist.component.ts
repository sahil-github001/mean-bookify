import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishList: any = [];
  errorMsg: any;

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

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getWishlist()

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

  getWishlist() {
    if (localStorage.getItem('userLogin') == 'true') {
      const email = localStorage.getItem('currentEmail');
      this.api.getWishFromUser(email).subscribe(
        (data: any) => {
          this.wishList = data.products;
          if (this.wishList.length == 0) {
            this.errorMsg = 'Empty wishlist';
          }
          else {
            this.errorMsg = '';
          }
        },
        (data: any) => {
          this.errorMsg = data.error.message;
          if (data.error.message == 'user not found') {
            alert(data.error.message);
          }
        }
      )
    }
    else {
      alert('please Login');
      this.router.navigateByUrl('');
    }


  }

  deleteWish(i: any) {
    if (localStorage.getItem('userLogin') == 'true') {
      const email = localStorage.getItem('currentEmail');
      this.api.deleteWishUser(i, email).subscribe(
        (result: any) => {
          alert(result.message);
          this.ngOnInit() // Automatic refresh
          this.wishList = result.wishList
        },
        (result: any) => {
          alert(result.error.message);
        }
      )
    } else { alert('user not found') }
  }

  deleteAllWish() {
    if (localStorage.getItem('userLogin') == 'true') {
      const email = localStorage.getItem('currentEmail');
      this.api.deleteAllWishUser(email).subscribe(
        (result: any) => {
          alert(result.message)
          this.ngOnInit()
        }
      )
    } else { alert('user not found') }

  }

  addToCart(product: any) {
    if (localStorage.getItem('userLogin') == 'true') {
      const email = localStorage.getItem('currentEmail');
      this.api.addCartToUser(product, email).subscribe(
        (result: any) => {
          alert(result.message)
        },
        (result: any) => {
          alert(result.error.message)
        }
      )
    } else { alert('user not found') }
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
