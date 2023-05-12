import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css']
})
export class BestSellersComponent implements OnInit {

  bestSeller: any = [];

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
    this.getAllBestSellers();

    this.api.searchkey.subscribe(
      (data: any) => {
        this.check = data
        this.displayAllProduct()
      }
    )
  }

  getAllBestSellers() {
    this.api.getAllProducts().subscribe(
      (data:any) => {
        data.products.map((products:any) => {
          if(products.category == 'Best Sellers'){this.bestSeller.push(products)}
        })
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
      alert('please Login');
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
    this.modalDiscount = product.discount
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
