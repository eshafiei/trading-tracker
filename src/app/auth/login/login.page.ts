import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public loginForm: FormGroup;
  error = '';

  constructor(private auth: AuthorizationService,
              private router: Router,
              private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.error = '';

    this.auth.signIn(this.loginForm.value).subscribe(
      () => this.router.navigateByUrl('/sectors'),
      (err) => this.error = err.message
    );
  }
}
