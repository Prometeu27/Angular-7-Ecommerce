import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public newUserId;
  constructor(private userService: UserService, private auth: AuthService, public router: Router) { }

  ngOnInit() {
  }

  onSubmit(email: string, password: string) {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password).then(userCredential=> {
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }

  login() {
    this.auth.login();
  }
}
