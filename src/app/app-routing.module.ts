import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthGuardService as AuthG } from './auth-guard.service';
import { AdminAuthGuardService as AdminAuthG } from './admin-auth-guard.service';
import { CategoryService } from './category.service';
import { CartGuardService } from './cart-guard.service';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { ProductsComponent } from './admin/products/products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'product/:routeID', component: ProductComponent},
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthG, CartGuardService]},
  { path: 'order-placed', component: OrderPlacedComponent, canActivate:[AuthG, CartGuardService]},
  { path: 'orders', component: OrdersComponent, canActivate: [AuthG, AdminAuthG]},
  { path: 'products', component: ProductsComponent, canActivate:[AuthG, AdminAuthG]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule],
  providers: [AuthService, AuthG, UserService, AdminAuthG, CategoryService, CartGuardService]
})
export class AppRoutingModule { }
