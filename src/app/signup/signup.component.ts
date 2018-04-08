import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email: string;
  password1: string;
  password2: string;
  message: string = "";

  constructor(public authService: AuthService, private router: Router,) {}

  signup() {
    if (this.password1 !== this.password2) console.log('passwords not correct');
    this.authService.signup(this.email, this.password1, (err) => {
        if (err){
            this.message = err; 
        }
        else {
            this.message = "success, redirecting after 3 seconds";
            this.email = this.password1 = this.password2 = '';
            setTimeout(() => {this.router.navigate(['/login']); }, 3000);
        }
    });
    this.message = "";
    }

  ngOnInit() {
  }

}
