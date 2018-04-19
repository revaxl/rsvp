import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './auth.component.html'
})

export class AuthComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
