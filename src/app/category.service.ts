import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore ) { }

  getCategories() {
    return this.db.collection('/categories');

  }
}
