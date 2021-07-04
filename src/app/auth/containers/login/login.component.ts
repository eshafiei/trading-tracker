import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailVerificationMessage = false;

  constructor(private auth: AuthorizationService,
              private router: Router) {

  }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.auth.signIn(email, password).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, (err)=> {
      this.emailVerificationMessage = true;
    });
  }
}
