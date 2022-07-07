import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { AppUser } from './models/app-user';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { ThrowStmt } from '@angular/compiler';

interface Users {
  name: string;
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  appUserDoc: AngularFirestoreDocument<Users>;
  users: Observable<Users[]>;

  pipe(arg0: any): import("rxjs").ObservableInput<unknown> {
    throw new Error
 ('Method not implemented.');
  }
  constructor(private db: AngularFirestore, public route:ActivatedRoute) { }

   save(user: firebase.User) {
    this.db.firestore.collection('users').doc(user.uid)
    .get().then(doc => {
      if(!doc.exists)  
      this.db.collection('/users/').doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        isAdmin: false
      }); 
    })
  }
  
}