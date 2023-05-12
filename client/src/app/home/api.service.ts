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


  loginAdmin(password: any) {
    const body = {
      password: password
    }
    console.log(body.password)
    return this.http.post('http://localhost:3000/loginAdmin', body);
  }

  editProductDetails(id:any, newValue:any, keyValue:any){
    const body = {
      id,
      newValue,
      keyValue
    }
    return this.http.post('http://localhost:3000/editProductDetails', body);
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
  deleteWishUser(index:any, email:any) {
    const body = {
      index,
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

  delivered(orderId:any, email:any){
    const body = {
      orderId,
      email
    }
    return this.http.put('http://localhost:3000/delivered', body);
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
