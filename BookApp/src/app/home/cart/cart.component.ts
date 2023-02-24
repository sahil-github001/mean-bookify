import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: any = [];
  errorMsg: any;

  modalTitle: any;
  modalImage: any;
  modalDescription: any;
  modalPrice: any;
  modalAuthor: any;
  modalDate: any;

  realPrice: number = 0;
  total: number = 0;
  totalDiscount: number = 0;

  displayHome = 'block'
  allProductDisplay = '';
  check = '';

  name:any;
  address:any;
  state:any;
  city:any;
  pincode:any;


  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {

    this.getCart()

    this.api.searchkey.subscribe(
      (data: any) => {
        this.check = data
        console.log('check', this.check)
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

  getCart() {
    if(localStorage.getItem('userLogin') == 'true'){
      const email = localStorage.getItem('currentEmail');
      this.api.getCartFromUser(email).subscribe(
        (data:any) => {
          this.cartList = data.products;
          this.total = 0;
          this.totalDiscount = 0;
          this.realPrice = 0;
          if(this.cartList.length == 0){
            this.errorMsg = 'Empty Cart';
          } else{
            this.errorMsg = '';
            this.cartList.map((item:any) => {
              this.realPrice += item.price;
              this.calculateDiscount(item)
            })
          }
        },
        (data:any) => {
          this.errorMsg = data.error.message;
        }
      )
    }else{
      this.api.getCart().subscribe(
        (data: any) => {
          this.cartList = data.products;
          this.total = 0
          this.totalDiscount = 0
          this.realPrice = 0;
          if (this.cartList.length == 0) {
            this.errorMsg = 'Empty Cart';
          } else {
            this.errorMsg = '';
            this.cartList.map((item: any) => {
              this.realPrice += item.price
              this.calculateDiscount(item)
            })
          }
        },
        (data: any) => {
          this.errorMsg = data.error.message;
        }
      )
    }
    
  }

  calculateDiscount(item: any) {
    let price = item.price;
    let discount = item.discount;
    let result = (price * discount) / 100;
    this.total += price - result
    this.totalDiscount += result
  }

  deleteCart(product: any, i:any) {
    if(localStorage.getItem('userLogin') == 'true'){
      const email = localStorage.getItem('currentEmail');
      const index = i;
      this.api.deleteCartUser(email, index).subscribe(
        (result: any) => {
          alert(result.message);
          this.ngOnInit() // Automatic refresh
        },
        (result: any) => {
          alert(result.error.message);
        }
      )
      }else{
        this.api.deleteCart(product.id).subscribe(
          (result: any) => {
            alert(result.message);
            this.ngOnInit() // Automatic refresh
    
            this.cartList = result.wishList
            // if(this.wishList.length == 0){
            //   this.e
            // }
          },
          (result: any) => {
            alert(result.error.message);
          }
        )
      }
  }

  deleteAllCart() {
    if(localStorage.getItem('userLogin') == 'true'){
      const email = localStorage.getItem('currentEmail');
      this.api.deleteAllCartUser(email).subscribe(
        (result:any) => {
          alert(result.message)
          this.ngOnInit()
        }
      )
    }else{
      this.api.deleteAllCart().subscribe(
        (result: any) => {
          alert(result.message)
          this.ngOnInit()
        }
      )
    }
 
  }

  //without alert after order placed
  deleteAllCart2() {  
    if(localStorage.getItem('userLogin') == 'true'){
      const email = localStorage.getItem('currentEmail');
      this.api.deleteAllCartUser(email).subscribe(
        (result:any) => {
          this.ngOnInit()
        }
      )
    }else{
      this.api.deleteAllCart().subscribe(
        (result: any) => {
          this.ngOnInit()
        }
      )
    }
  }

  orderNow(){
  
    if(localStorage.getItem('userLogin') == 'true'){
      const address:any = {
        name: this.name,
        address : this.address,
        state : this.state,
        city : this.city,
        pincode : this.pincode
      }
      const total = this.total
      const email = localStorage.getItem('currentEmail'); 
      const userName = localStorage.getItem('firstName')
      const productList = this.cartList
      this.api.addOrder(address, total, email, productList, userName).subscribe(
        (result:any) => {
          alert(result.message)
        },
        (result:any) => {
          alert(result.error.message)
        }
      )
      this.deleteAllCart2()
      this.router.navigateByUrl('home/orders')
    }
    else{
      this.router.navigateByUrl('home/login')
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

  //modal for orders
  displayStyle2 = "none";
  openPopup2() {
    this.displayStyle2 = "block";
  }
  closePopup2() {
    this.displayStyle2 = "none";
  }
}
