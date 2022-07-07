import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class AdminAuthGuardService {
  constructor(private auth: AuthService, private db: AngularFirestore) {
    
   }
   public arr: any[] = []

  canActivate() {
    this.getAdminStatus()
    return this.arr[0];
  }

  getAdminStatus() {
    this.auth.user$.subscribe(user => { this.db.collection('users').doc(user.uid).get().subscribe(data => {
      this.arr.push(data.data().isAdmin)
    })
  })
  }
}