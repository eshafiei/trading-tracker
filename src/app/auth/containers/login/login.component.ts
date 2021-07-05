import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  emailVerificationMessage = false;
  error = '';

  constructor(private auth: AuthorizationService,
              private router: Router,
              private fb: FormBuilder,
              private loader: LoaderService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.loader.showLoader();

    this.auth.signIn(this.loginForm.value).subscribe(
      () => this.router.navigateByUrl('/sectors'),
      (err) => {
        this.loader.hideLoader();
        this.error = err.message;
      },
      () => this.loader.hideLoader()
    );
  }
}
