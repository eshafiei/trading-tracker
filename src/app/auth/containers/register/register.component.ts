import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  confirmCode = false;
  codeWasConfirmed = false;
  error = '';
  validationCode: string;

  constructor(private auth: AuthorizationService,
              private router: Router,
              private fb: FormBuilder,
              private loader: LoaderService) {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  register() {
    this.error = '';
    this.loader.showLoader();
    this.auth.register(this.registerForm.value).subscribe(
      () => this.confirmCode = true,
      (err) => {
        console.log(err);
        this.error = err.message;
        this.loader.hideLoader();
      },
      () => this.loader.hideLoader()
    );
  }

  validateAuthCode(validationCode: string | number) {
    this.error = '';
    this.loader.showLoader();
    this.auth.confirmAuthCode(validationCode.toString()).subscribe(
      () => this.router.navigateByUrl('/login'),
      (err) => {
        this.error = err.message;
        this.loader.hideLoader();
      },
      () => this.loader.hideLoader()
    );
  }

  get f() {
    return this.registerForm.controls;
  }
}
