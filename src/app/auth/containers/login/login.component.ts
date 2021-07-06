import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  public loginForm: FormGroup;
  error = '';

  constructor(private auth: AuthorizationService,
              private router: Router,
              private fb: FormBuilder,
              private loader: LoaderService) {
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
