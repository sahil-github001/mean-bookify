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
    this.api.getAllProducts().subscribe(
      (data: any) => {
        this.allProducts = data.products;
      }
    )

    this.getOrderList()
  }

  
  getOrderList(){
    this.api.getOrderFromAdmin().subscribe(
      (result:any) => {
        this.orderList = result.orderList
        console.log(this.orderList)
      },
      (result:any) => {
        alert(result.error.message)
      }
    )
  }

  changeTitle() {
    if (this.editTitle == '') {
      alert('Title is empty');
    }
    else {
      this.api.changeName(this.modalId, this.editTitle).subscribe(
        (result: any) => {
          if (result) {
            alert(result.message)
            this.displayStyle = "none";
            this.editTitle = '';
            this.ngOnInit()
          }
        },
        (result: any) => {
          alert(result.error.message)
        }
      )
    }
  }

  changeAuthor() {
    if (this.editAuthor == '') {
      alert('input is empty');
    }
    else {
      this.api.changeAuthor(this.modalId, this.editAuthor).subscribe(
        (result: any) => {
          if (result) {
            alert(result.message)
            this.displayStyle = "none";
            this.editAuthor = '';
            this.ngOnInit()
          }
        },
        (result: any) => {
          alert(result.error.message)
        }
      )
    }
  }

  changeCategory() {
    if (this.editCategory == '') {
      alert('input is empty');
    }
    else {
      this.api.changeCategory(this.modalId, this.editCategory).subscribe(
        (result: any) => {
          if (result) {
            alert(result.message)
            this.displayStyle = "none";
            this.editCategory = '';
            this.ngOnInit()
          }
        },
        (result: any) => {
          alert(result.error.message)
        }
      )
    }
  }

  changePrice() {
    if (this.editPrice == '') {
      alert('input is empty');
    }
    else {
      this.api.changePrice(this.modalId, this.editPrice).subscribe(
        (result: any) => {
          if (result) {
            alert(result.message)
            this.displayStyle = "none";
            this.editPrice = '';
            this.ngOnInit()
          }
        },
        (result: any) => {
          alert(result.error.message)
        }
      )
    }
  }

  changeDiscount() {
    if (this.editDiscount == '') {
      alert('input is empty');
    }
    else {
      this.api.changeDiscount(this.modalId, this.editDiscount).subscribe(
        (result: any) => {
          if (result) {
            alert(result.message)
            this.displayStyle = "none";
            this.editDiscount = '';
            this.ngOnInit()
          }
        },
        (result: any) => {
          alert(result.error.message)
        }
      )
    }
  }

  changeDate() {
    if (this.editDate == '') {
      alert('input is empty');
    }
    else {
      this.api.changeDate(this.modalId, this.editDate).subscribe(
        (result: any) => {
          if (result) {
            alert(result.message)
            this.displayStyle = "none";
            this.editDate = '';
            this.ngOnInit()
          }
        },
        (result: any) => {
          alert(result.error.message)
        }
      )
    }
  }

  showOrderList(){
    this.displayDashboard = 'none'
    this.displayOrder = 'block'
  }
  hideOrderList(){
    this.displayDashboard = 'block'
    this.displayOrder = 'none'
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
