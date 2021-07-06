import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements ViewDidEnter{
  public loginForm: FormGroup;
  emailVerificationMessage = false;
  error = '';

  constructor(private auth: AuthorizationService,
              private router: Router,
              private fb: FormBuilder,
              private loader: LoaderService,
              private messageService: MessageService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidEnter(): void {
    this.messageService.receiveMessage().subscribe((m) => {
      if(m === 'loggedOut') {
        console.log('loggedout!');
      }
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
