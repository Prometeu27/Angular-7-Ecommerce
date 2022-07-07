import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Product } from '../../models/product';
import { OrdersService } from '../../orders.service';
import { OrderProduct } from './../../models/order-product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsCol: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;

  prodsCol: AngularFirestoreCollection<Product>;
  prods: Observable<Product[]>;
  productsArray: OrderProduct[][] = [];
  numberOfProducts: number;
  constructor(private db: AngularFirestore, private auth: AuthService, public ordersService: OrdersService) { console.log(this.title) }
  @Input() title: string;

  ngOnInit() {
    this.productsCol = this.db.collection('prods');
    this.products = this.productsCol.valueChanges({ idField: 'productId' });
  }

  deleteProduct(productID) {
    this.db.collection('prods').doc(productID).delete();
  }

  onSubmit(data){
    this.db.collection('prods').add({name:data.name, category: data.category, price: data.price, imgUrl: data.image, amount: data.amount, det1: data.details})
  }
}