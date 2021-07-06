/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { MessageService } from '../../shared/services/message.service';
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

  constructor(private messageService: MessageService) { }

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

  // getUserAttributes() {
  //   // gets the current user from the local storage
  //   let userAttributes: any;
  //   userPool.getCurrentUser().getSession(() => {});
  //   userPool.getCurrentUser().getUserAttributes(
  //     (attr) => userAttributes = attr
  //   );
  //   return userAttributes;
  // }

  logOut() {
    this.messageService.sendMessage('loggedOut');
    this.getAuthenticatedUser()?.signOut();
    this.cognitoUser = null;
  }
}
