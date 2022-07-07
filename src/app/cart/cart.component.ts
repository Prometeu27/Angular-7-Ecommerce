import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Product } from '../models/product';
import { OrdersService } from '../orders.service';
import { CartGuardService } from './../cart-guard.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  prodsCol: AngularFirestoreCollection<Product>;
  prods: Observable<Product[]>;

  constructor(private db: AngularFirestore, private auth: AuthService, public ordersService: OrdersService, public cg: CartGuardService) { }
  
  public totalPrice:number = 0;
  public cartID = localStorage.getItem('cartID');
  public cartSize;
  public transportPrice = 0;
  ngOnInit() {
    this.db.collection('carts').doc(this.cartID).collection('items').get().subscribe(products => {
      this.cartSize = products.size;
      if (this.cartSize > 0) this.transportPrice = 25;
    })
    this.prodsCol = this.db.collection('carts').doc(this.cartID).collection('items');
    this.prods = this.prodsCol.valueChanges({ idField: 'prodId' });
    this.getTotalPrice()
  }

  deleteProduct(productID) {
    this.db.collection('carts').doc(this.cartID).collection('items').doc(productID).delete();
    this.db.collection('carts').doc(this.cartID).collection('items').get().subscribe(x => {
      if(x.size === 0 ) this.deleteCart();
    })
  }

  inputChange(inputQuantity, productID) {
    this.db.collection('carts').doc(this.cartID).collection('items').doc(productID).update({ quantity: inputQuantity})
  }
  
  deleteCart() {
    this.db.collection('carts').doc(this.cartID).delete();
    this.db.collection('carts').doc(this.cartID).collection('items').get().subscribe(x => {
      x.forEach(y => {
        this.db.collection('carts').doc(this.cartID).collection('items').doc(y.id).delete();
      })
    })
    this.totalPrice = 0;
    this.transportPrice = 0;
  }

  getTotalPrice() {
    this.db.collection('carts').doc(this.cartID).collection('items').get().subscribe(x => {
      x.forEach(y => {
        this.totalPrice = this.totalPrice + (y.data().product.price * y.data().quantity);
      })
    })
  }

}
