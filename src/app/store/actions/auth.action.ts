import { Action } from '@ngrx/store';
import { AuthenticatedUser } from '../models/authenticated-user.model';

export const SIGNIN = '[Auth] SignIn';

export class SignIn implements Action {
  readonly type = SIGNIN;

  constructor(public payload: AuthenticatedUser) {}
}

export type Actions = SignIn;
