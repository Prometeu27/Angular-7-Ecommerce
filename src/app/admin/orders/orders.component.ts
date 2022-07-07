import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Product } from '../../models/product';
import { OrdersService } from '../../orders.service';
import { OrderProduct } from './../../models/order-product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordersCol: AngularFirestoreCollection<Product>;
  orders: Observable<Product[]>;

  prodsCol: AngularFirestoreCollection<Product>;
  prods: Observable<Product[]>;
  ordersArray: OrderProduct[][] = [];
  numberOfOrders: number;
  constructor(private db: AngularFirestore, private auth: AuthService, public ordersService: OrdersService) { console.log(this.title) }
  @Input() title: string;

  ngOnInit() {
    this.ordersCol = this.db.collection('orders');
    this.orders = this.ordersCol.valueChanges({ idField: 'orderId' });
    this.ordersArray = this.ordersService.getOrders(this.ordersArray);
    this.checkOrders();
  }

  checkOrders() {
    this.db.collection('orders').get().subscribe(orders => {
      this.numberOfOrders = orders.size;
    })
  }

  deleteOrder(orderID: string, index) {
    delete this.ordersArray[index];
    this.db.collection('orders').doc(orderID).collection('items').get().subscribe((x) => {
      x.forEach((doc) => {
        this.db.collection('orders').doc(orderID).collection('items').doc(doc.id).delete();
      })
    })
    this.db.collection('orders').doc(orderID).delete();
  }


}
