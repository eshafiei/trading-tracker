/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';

const poolData = {
  UserPoolId: '', // Your user pool id here
  ClientId: '' // Your client id here
};

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthorizationService {
  cognitoUser: any;

  constructor() { }

  register(user: UserModel) {

  const attributeList = [];

  const firstName = {
    Name : 'given_name',
    Value : user.firstName
  };

  const lastName = {
    Name : 'family_name',
    Value : user.lastName
  };

  const attributeFirstName = new CognitoUserAttribute(firstName);
  const attributeLastName = new CognitoUserAttribute(lastName);
  attributeList.push(attributeFirstName);
  attributeList.push(attributeLastName);

    return new Observable(observer => {
      userPool.signUp(user.email, user.password, attributeList, null, (err, result) => {
        if (err) {
          //console.log('signUp error', err);
          observer.error(err);
        }

        this.cognitoUser = result.user;
        //console.log('signUp success', result);
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
            //console.log(err);
            observer.error(err);
          }
          //console.log('confirmAuthCode() success', result);
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

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }
}
