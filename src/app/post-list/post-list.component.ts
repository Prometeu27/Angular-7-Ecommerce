import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Product } from '../models/product';
import { CartProduct } from '../models/cart-product';
import { CartsService } from './../carts.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  prodsCol: AngularFirestoreCollection<CartProduct>;
  prods: Observable<CartProduct[]>;

  constructor(private afs: AngularFirestore, private cartsService: CartsService, private router: Router, public infoPopup: MatSnackBar) {
  }
  
  ngOnInit() {  
    this.prodsCol = this.afs.collection('prods');
    this.prods = this.prodsCol.valueChanges({idField: 'prodId'});
  }

  addTC(product:Product, prodId: string) {
    this.cartsService.addToCart(product, prodId);
    this.infoPopup.openFromComponent(InfoPopupComponent, {
      duration: 3000,
    });
  } 
}

@Component({
  selector: 'info-popup',
  templateUrl: 'info-popup.html',
  styles: ['./post-list.component.css'],
})
export class InfoPopupComponent {}
