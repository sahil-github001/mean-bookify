import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  allProducts: any = [];

  editTitle: string = '';
  editAuthor: string = '';
  editPrice: string = '';
  editCategory: string = '';
  editDiscount: string = '';
  editDate: string = '';

  modalTitle: any;
  modalImage: any;
  modalDescription: any;
  modalPrice: any;
  modalAuthor: any;
  modalDate: any;
  modalId: any;

  orderList = [];

  displayDashboard = 'block'
  displayOrder = 'none'
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getOrderList()

    this.api.getAllProducts().subscribe(
      (data: any) => {
        this.allProducts = data.products;
      }
    )
  }


  getOrderList() {
    this.api.getOrderFromAdmin().subscribe(
      (result: any) => {
        this.orderList = result.orderList
        console.log(this.orderList)
      },
      (result: any) => {
        alert(result.error.message)
      }
    )
  }

  editProductDetails(id: any, newValue: any, keyValue: any) {
    this.api.editProductDetails(id, newValue, keyValue).subscribe(
      (result: any) => {
        if (result) {
          alert(result.message)
          this.displayStyle = "none";
          this.editTitle = '';
          this.editAuthor = '';
          this.editDate = '';
          this.editCategory = '';
          this.editPrice = '';
          this.editDiscount = '';
          this.ngOnInit()
        }
      },
      (result: any) => {
        alert(result.error.message)
      }
    )
  }

  changeTitle() {
    this.editTitle == '' ? alert('input is empty') : this.editProductDetails(this.modalId, this.editTitle, 'name')
  }

  changeAuthor() {
    this.editAuthor == '' ? alert('input is empty') : this.editProductDetails(this.modalId, this.editAuthor, 'author')
  }

  changeCategory() {
    this.editCategory == '' ? alert('input is empty') : this.editProductDetails(this.modalId, this.editCategory, 'category')
  }

  changePrice() {
    this.editPrice == '' ? alert('input is empty') : this.editProductDetails(this.modalId, this.editPrice, 'price')
  }

  changeDiscount() {
    this.editDiscount == '' ? alert('input is empty') : this.editProductDetails(this.modalId, this.editDiscount, 'discount')
  }

  changeDate() {
    this.editDate == '' ? alert('input is empty') : this.editProductDetails(this.modalId, this.editDate, 'date');
  }

  showOrderList() {
    this.displayDashboard = 'none'
    this.displayOrder = 'block'
  }
  hideOrderList() {
    this.displayDashboard = 'block'
    this.displayOrder = 'none'
  }

  delivered(orderId: any, email: any) {
    this.api.delivered(orderId, email).subscribe(
      (result: any) => {
        alert(result.message);
        this.ngOnInit();
      },
      (result: any) => {
        alert(result.error.message)
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
    this.modalId = product.id
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
