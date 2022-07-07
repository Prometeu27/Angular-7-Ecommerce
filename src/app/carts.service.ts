import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private db: AngularFirestore) { }

  create() {
    return this.db.collection('carts').add({})
  }

  private async cartCheck() {
    let cartID = localStorage.getItem('cartID');
    if (cartID) return cartID;

    let res = await this.create();
    localStorage.setItem('cartID', res.id);
    return res.id;
  }

  async addToCart(product: Product, prodId: string) {
    let cartID = await this.cartCheck();
    let item$ = this.db.collection('carts').doc(cartID).collection('items').doc(prodId);

    item$.update({ quantity: firebase.firestore.FieldValue.increment(1) }).catch(() => {
      item$.set({ product: product, quantity: 1 });
    })

  }
}