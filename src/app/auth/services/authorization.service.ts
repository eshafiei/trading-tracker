/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute,
  CognitoIdToken, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Observable, Observer, throwError } from 'rxjs';
import { AppState } from '../../store/models/app.state';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';
import * as AuthActions from '../../store/actions/auth.action';
import { Router } from '@angular/router';

const poolData = {
  UserPoolId: '', // Your user pool id here
  ClientId: '' // Your client id here
};

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthorizationService {
  cognitoUser: any;

  constructor(private router: Router,
    private store: Store<AppState>) {}

  register(user: UserModel) {

  const attributeList = [];

  const email = {
    Name : 'email',
    Value : user.email
  };

  const firstName = {
    Name : 'given_name',
    Value : user.firstName
  };

  const lastName = {
    Name : 'family_name',
    Value : user.lastName
  };

  const attributeEmail = new CognitoUserAttribute(email);
  const attributeFirstName = new CognitoUserAttribute(firstName);
  const attributeLastName = new CognitoUserAttribute(lastName);
  attributeList.push(attributeFirstName);
  attributeList.push(attributeLastName);
  attributeList.push(attributeEmail);

    return new Observable(observer => {
      userPool.signUp(user.username, user.password, attributeList, null, (err, result) => {
        if (err) {
          observer.error(err);
        }

        this.cognitoUser = result.user;
        observer.next(result);
        observer.complete();
      });
    });

  }

  confirmAuthCode(code: string) {
    const user = {
      Username : this.cognitoUser.username,
      Pool : userPool
    };
    return new Observable(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true,
        (err, result) => {
          if (err) {
            observer.error(err);
          }
          observer.next(result);
          observer.complete();
        });
    });
  }

  signIn(loginModel: LoginModel) {
    const authenticationData = {
      Username : loginModel.email,
      Password : loginModel.password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : loginModel.email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return new Observable(observer => {

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          observer.next(result);
          console.log(result);
          this.getIdToken().subscribe(res => {
            console.log('userId:' + res.payload.sub);
            this.store.dispatch(new AuthActions.SignIn({
              jwtToken: '',//res.jwtToken,
              authTime: res.payload.auth_time,
              givenName: res.payload.given_name,
              familyName: res.payload.family_name,
              userId: res.payload.sub
            }));
          });
          observer.complete();
        },
        onFailure: (err) => {
          observer.error(err);
        },
      });
    });
  }

  isLoggedIn() {
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  getIdToken(): Observable<CognitoIdToken> {
    const user: CognitoUser = userPool.getCurrentUser();

    if (user) {
      return new Observable((observer: Observer<any>) => {
        user.getSession((err, session: CognitoUserSession) => {
          if (err) {
            return observer.error(err);
          }
          observer.next(session.getIdToken());
        });
      });
    } else {
      return throwError(null);
    }
  }

  logOut() {
    this.getAuthenticatedUser()?.signOut();
    this.cognitoUser = null;
    this.router.navigateByUrl('/login');
  }
}
