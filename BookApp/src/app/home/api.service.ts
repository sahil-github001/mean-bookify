import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  searchkey = new BehaviorSubject('');
  noResultFound = new BehaviorSubject('');

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get('http://localhost:3000/all-products');
  }

  getTopBestSellers() {
    return this.http.get('http://localhost:3000/top-bestSellers');
  }

  getTopFiction() {
    return this.http.get('http://localhost:3000/top-fiction');
  }

  getTopNewArrival() {
    return this.http.get('http://localhost:3000/top-newArrival');
  }

  getAllBestSellers() {
    return this.http.get('http://localhost:3000/all-bestSellers');
  }

  getAllFiction() {
    return this.http.get('http://localhost:3000/all-fiction');
  }

  getAllNewArrival() {
    return this.http.get('http://localhost:3000/all-newArrival');
  }

  addToWishlist(product: any) {
    const body = {
      id: product.id,
      name: product.name,
      author: product.author,
      price: product.price,
      image: product.image,
      description: product.description,
      date: product.date,
      discount: product.discount
    }
    return this.http.post('http://localhost:3000/addToWishlist', body);
  }

  getWishlist() {
    return this.http.get('http://localhost:3000/getWishlist');
  }

  deleteWish(id: any) {
    return this.http.delete('http://localhost:3000/deleteWishlist/' + id);
  }

  deleteAllWish() {
    return this.http.delete('http://localhost:3000/deleteAllWishlist');
  }

  addToCart(product: any) {
    const body = {
      id: product.id,
      name: product.name,
      author: product.author,
      price: product.price,
      image: product.image,
      description: product.description,
      date: product.date,
      discount: product.discount
    }
    return this.http.post('http://localhost:3000/addToCart', body);
  }

  getCart() {
    return this.http.get('http://localhost:3000/getCart');
  }

  deleteCart(id: any) {
    return this.http.delete('http://localhost:3000/deleteCart/' + id);
  }

  deleteAllCart() {
    return this.http.delete('http://localhost:3000/deleteAllCart');
  }

  loginAdmin(password: any) {
    const body = {
      password: password
    }
    console.log(body.password)
    return this.http.post('http://localhost:3000/loginAdmin', body);
  }

  changeName(id: any, title: any) {
    id = Number(id);
    const body = {
      id: id,
      newName: title
    }
    return this.http.post('http://localhost:3000/editName', body);
  }

  changeAuthor(id: any, title: any) {
    id = Number(id);
    const body = {
      id: id,
      newAuthor: title
    }
    return this.http.post('http://localhost:3000/editAuthor', body);
  }

  changePrice(id: any, price: any) {
    id = Number(id);
    const body = {
      id: id,
      newPrice: price
    }
    return this.http.post('http://localhost:3000/editPrice', body);
  }

  changeCategory(id: any, value: any) {
    id = Number(id);
    const body = {
      id: id,
      newCategory: value
    }
    return this.http.post('http://localhost:3000/changeCategory', body);
  }

  changeDiscount(id: any, value: any) {
    id = Number(id);
    const body = {
      id: id,
      newDiscountValue: value
    }
    return this.http.post('http://localhost:3000/editDiscount', body);
  }

  changeDate(id: any, value: any) {
    id = Number(id);
    const body = {
      id: id,
      newDate: value
    }
    return this.http.post('http://localhost:3000/newDate', body);
  }

  register(firstName:any, lastName:any, email:any, password:any){
    const body = {
      firstName,
      lastName,
      email,
      password
    }
    return this.http.post('http://localhost:3000/register', body);
  }

  login(email:any, password:any){
    const body = {
      email,
      password
    }
    return this.http.post('http://localhost:3000/login', body);
  }

  addWishToUser(product:any, email:any) {
    const body = {
      id: product.id,
      name: product.name,
      author: product.author,
      price: product.price,
      image: product.image,
      description: product.description,
      date: product.date,
      discount: product.discount,
      email:email
    }
    return this.http.post('http://localhost:3000/addWishToUser', body);
  }

  getWishFromUser(email:any) {
    const body = {
      email:email
    }
    return this.http.post('http://localhost:3000/getWishFromUser', body);
  }
  deleteAllWishUser(email:any) {
    const body = {
      email:email
    }
    return this.http.post('http://localhost:3000/clearAllWishUser', body);
  }
  deleteWishUser(id:any, email:any) {
    const body = {
      id,
      email
    }
    return this.http.post('http://localhost:3000/deleteWishUser' ,body);
  }

  addOrder(address:any, total:any, email:any, productList:any, userName:any){
    const body = {
      address,
      total,
      email,
      productList,
      userName
    }
    console.log(body)
    return this.http.post('http://localhost:3000/addOrder' ,body);
  }

  getOrderFromUser(email:any){
    const body = {
      email
    }
    return this.http.post('http://localhost:3000/getOrderUser' ,body);
  }
  getOrderFromAdmin(){
    return this.http.get('http://localhost:3000/getOrderAdmin');
  }



  addCartToUser(product:any, email:any) {
    const body = {
      id: product.id,
      name: product.name,
      author: product.author,
      price: product.price,
      image: product.image,
      description: product.description,
      date: product.date,
      discount: product.discount,
      email:email
    }
    return this.http.post('http://localhost:3000/addCartToUser', body);
  }

  getCartFromUser(email:any) {
    const body = {
      email:email
    }
    return this.http.post('http://localhost:3000/getCartFromUser', body);
  }
  deleteAllCartUser(email:any) {
    const body = {
      email:email
    }
    return this.http.post('http://localhost:3000/deleteAllCartFromUser', body);
  }
  deleteCartUser(email:any, index:any) {
    const body = {
      email,
      index
    }
    return this.http.post('http://localhost:3000/deleteCartFromUser' ,body);
  }

}
