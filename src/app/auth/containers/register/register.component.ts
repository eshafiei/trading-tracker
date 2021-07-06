import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  confirmCode = false;
  error = '';
  validationCode: string;

  constructor(private auth: AuthorizationService,
              private router: Router,
              private fb: FormBuilder,
              private loader: LoaderService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  signup(event: any) {
    this.error = '';
    event.target.disabled = true;
    this.loader.showLoader();
    this.auth.register(this.registerForm.value).subscribe(
      () => this.confirmCode = true,
      (err) => {
        this.error = err.message;
        this.loader.hideLoader();
      },
      () => this.loader.hideLoader()
    );
  }

  validateAuthCode(validationCode: string | number) {
    this.error = '';
    this.auth.confirmAuthCode(validationCode.toString()).subscribe(
      () => {
        const loginModel: LoginModel = {
          email: this.registerForm.value?.email,
          password: this.registerForm.value?.password
        };
        this.auth.signIn(loginModel).subscribe(
          () => this.router.navigateByUrl(''),
          (err) => this.error = err.message
        );
      },
      (err) => this.error = err.message
    );
  }
}
