import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { faNavicon } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { AdminAuthGuardService } from './../admin-auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faNavicon= faNavicon;
  faShoppingCart = faShoppingCart;
  showFiller = false;
  show = false;
  dropdownVisible = false;
  isAdmin: any[] =[];
  constructor(public auth: AuthService, private db: AngularFirestore, public authpopup: MatSnackBar) {
  }
  public cartID = localStorage.getItem('cartID');
  public adminValue;
  public cartSize;
  ngOnInit() {
    this.db.collection('carts').doc(this.cartID).collection('items').valueChanges().subscribe(products => {
      var size = 0;
      products.forEach(doc => {
        size = size + 1;
      }) 
      this.cartSize = size;
    })
    this.auth.user$.subscribe(user => { 
      this.db.collection('users').doc(user.uid).get().subscribe(data => {
      this.isAdmin.push(data.data().isAdmin)
    })
  })

  }

  opened = false;
  toggleSideBar() {
    this.opened = !this.opened;
  }

  logout() {
    this.auth.logout();
    this.authpopup.openFromComponent(AuthPopup, {
      duration: 7000,
    });
  }

  shown() {
    this.show = !this.show;
  }
}

@Component({
  selector: 'auth-popup',
  template: '<p>Te-ai autentificat cu succes! Bine ai venit!</p>',
  styles: ['./header.component.css'],
})
export class AuthPopup {}