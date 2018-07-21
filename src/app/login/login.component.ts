import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AUTHENTICATION } from '../../constants/enums';
import authenticate from '../utils/login-utils';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';

  password: string = '';

  error: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }


  onLoginButtonClick(): void {

    this.error = '';

    const credentials = {
      encodedUsername: btoa(this.username),
      encodedPassword: btoa(this.password),
    }

    if(authenticate(credentials)) {
      this.router.navigate(['dashboard']);
    } else {
      this.error = AUTHENTICATION.ERROR;
    }
  }
}
