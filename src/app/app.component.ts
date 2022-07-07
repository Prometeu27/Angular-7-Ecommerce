import { Component } from '@angular/core';
import { Post } from './post.model';  
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public newBoolean: boolean;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    auth.user$.subscribe(user => {
      if (user) this.userService.save(user);
      this.router.navigate(['/']);

    });
  }
}
  