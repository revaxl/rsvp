import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { AuthService } from "../../services/auth.service";
import { User } from "../../models/users";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  onSubmit() {
  console.log(this.myForm);
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.name,
      this.myForm.value.address,
      this.myForm.value.phone
    );
    console.log(user);
    this.authService.signup(user)
      .subscribe(
        data => this.toastr.success('Registration complete'),
        error => console.error(error)
      );
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required),
      name: new FormControl(null),
      address: new FormControl(null),
      phone: new FormControl(null)
    });
  }
}
