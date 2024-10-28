import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../service/auth/auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = { email: '', password: '' };
  errorMessage: string = ''; 

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}



  loginWithEmail() {
    this.authService.loginWithEmail(this.user.email, this.user.password).subscribe((data:any) => {     
      if(this.user.email == data[0].email && this.user.password == data[0].password) {
        this.router.navigate(['/game']);
      } else {
        this.errorMessage = "Username หรือ Password ผิด";
      }         
    });
  }

}
