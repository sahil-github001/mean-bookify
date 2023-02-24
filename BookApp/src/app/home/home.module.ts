import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { FictionComponent } from './fiction/fiction.component';
import { NewArrivalComponent } from './new-arrival/new-arrival.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    HomeComponent,
    BestSellersComponent,
    FictionComponent,
    NewArrivalComponent,
    WishlistComponent,
    CartComponent,
    AllProductsComponent,
    FilterPipe,
    AdminLoginComponent,
    AdminDashboardComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    OrdersComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
