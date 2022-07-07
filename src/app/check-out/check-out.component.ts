import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  public deliveryData: any[] = [];
  public cartID = localStorage.getItem('cartID');

  constructor(private db: AngularFirestore, public ordersService: OrdersService) { }
  
  ngOnInit() { }

  onSubmit(data){
    this.db.collection('carts').doc(this.cartID).collection('items').get().subscribe(products => {
      if(products.size > 0) {
      this.deliveryData.push({name: data.name, phone: data.phone, county: data.county, city: data.city, address: data.address})
      this.ordersService.placeOrder(this.cartID, this.deliveryData);
      }
    })
  }

}
