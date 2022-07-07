import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartGuardService {

  constructor(private db: AngularFirestore) { }

  public cartID = localStorage.getItem('cartID');
  cartSize: any[] = [];
  cartExists: any[] = [];

  canActivate(){
    this.checkSize();
    return this.cartSize[0];
  }

  checkSize(){
    this.db.collection('carts').doc(this.cartID).collection('items').valueChanges().subscribe(products => {
      var size = 0;
      products.forEach(doc => {
        size = size + 1;
      }) 
      this.cartExists.push(size);
      if(this.cartExists[0] > 0) this.cartSize.push(true);
      else this.cartSize.push(false);
    })
  }  
}