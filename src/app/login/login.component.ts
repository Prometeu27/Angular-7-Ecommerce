import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit() {}

  login() {
    this.auth.login();
  }

  onSubmit(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      }); 
  }


}
