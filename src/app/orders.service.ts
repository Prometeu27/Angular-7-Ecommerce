import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { OrderProduct } from './models/order-product';

import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private db: AngularFirestore, private auth: AuthService) { }

  create() {
    return this.db.collection('orders').add({})
  }
  
  async placeOrder(cartID, deliveryData: any[]){
    let res = await this.create();
    localStorage.setItem('orderID', res.id);    
    let orderID = res.id;
    var order = this.db.collection('orders').doc(orderID);
    order.set({
      customerID: firebase.auth().currentUser.uid,
      customerUsername: firebase.auth().currentUser.displayName,
      customerEmail: firebase.auth().currentUser.email,
      customerName: deliveryData[0].name,
      customerPhone: deliveryData[0].phone,
      customerCounty: deliveryData[0].county,
      customerCity: deliveryData[0].city,
      customerAddress: deliveryData[0].address
    })
    this.db.collection('carts').doc(cartID).collection('items').get().subscribe((x) => {
      x.forEach((doc) => {
        this.db.collection('orders').doc(orderID).collection('items').doc(doc.id).set(doc.data());
        this.db.collection('carts').doc(cartID).collection('items').doc(doc.id).delete();

      })
    })
    this.db.collection('carts').doc(cartID).delete();
    localStorage.removeItem('cartID');
  }
  
  getOrders(array: OrderProduct[][]) {
    var id, name, price, qnt, index = 0;
   
    this.db.collection('orders').get().subscribe((x) => {
      x.forEach((order) => {
        var cID = order.data().customerID; 
        var cUsername = order.data().customerUsername;
        var cEmail = order.data().customerEmail;
        var cName = order.data().customerName;
        var cPhone = order.data().customerPhone;
        var cCity = order.data().customerCity;
        var cCounty = order.data().customerCounty;
        var cAddress = order.data().customerAddress;

        var arr: OrderProduct[] = [];
        this.db.collection('orders').doc(order.id).collection('items').get().subscribe((x) => {
          
          x.forEach(product => {
            id = product.id;
            name = product.data().product.name;
            price = product.data().product.price;  
            qnt = product.data().quantity;
            arr.push({pId:id, name: name, price: price, quantity: qnt, customerID: cID, customerUsername: cUsername, customerEmail: cEmail, customerName: cName, customerPhone: cPhone, customerCity: cCity, customerCounty: cCounty, customerAddress: cAddress, orderID: order.id});
          })
        })
        array[index] = arr ;
        index = index + 1;
      })
    })
    return array;
  }
}
