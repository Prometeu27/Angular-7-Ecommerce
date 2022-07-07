import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { CartsService } from '../carts.service';
import { MatSnackBar } from '@angular/material';
import { InfoPopupComponent } from '../post-list/post-list.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  productID: any;
  prodData: Product[] = [];

  constructor(private cartsService: CartsService, private router: Router, private db: AngularFirestore, public infoPopup: MatSnackBar) {
    this.productID = this.router.url.split("/")[2];
  }

  ngOnInit() {
    var prod = this.db.collection('prods').doc(this.productID).get();

    prod.subscribe(x => {
      console.log(x.data())
      var imageUrl = x.data().imgUrl;
      var name = x.data().name;
      var price = x.data().price;
      var category = x.data().category;
      var amount = x.data().amount;
      var det1 = x.data().det1;
      this.prodData.push({imageUrl: imageUrl, name: name, price: price, category: category, amount: amount, det1: det1})
    })
  }

  addTC(product:Product, prodId: string) {
    this.cartsService.addToCart(product, prodId);
    this.infoPopup.openFromComponent(InfoPopupComponent, {
      duration: 3000,
    });
  }



}
