import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthPopup, HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module'
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PostCreateComponent } from './post-create/post-create.component';
import { InfoPopupComponent, PostListComponent } from './post-list/post-list.component';
import { ProductComponent } from './product/product.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { UserService } from './user.service';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { ProductsComponent } from './admin/products/products.component';


const firebaseConfig = {
  apiKey: "AIzaSyDxFUiKa4bNXCOJFK1Hy53Xnm39gJynO1Q",
  authDomain: "ecom-a1.firebaseapp.com",
  projectId: "ecom-a1",
  storageBucket: "ecom-a1.appspot.com",
  messagingSenderId: "1086576899412",
  appId: "1:1086576899412:web:9ffd58d163986564ed44c1",
  measurementId: "G-DL3J4725WP"
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    PostCreateComponent,
    PostListComponent,
    ProductComponent,
    CheckOutComponent,
    OrdersComponent,
    OrderPlacedComponent,
    InfoPopupComponent,
    ProductsComponent,
    AuthPopup
  ],
  imports: [
BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
  
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  entryComponents: [PostListComponent, InfoPopupComponent]
})
export class AppModule { }
