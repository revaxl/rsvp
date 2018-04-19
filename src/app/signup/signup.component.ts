import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username: string;
  joined: number = Date.now();
  email: string;
  password1: string;
  password2: string;
  message = "";

  constructor(public authService: AuthService, private router: Router,) {}

  ngOnInit() {
  }

}
