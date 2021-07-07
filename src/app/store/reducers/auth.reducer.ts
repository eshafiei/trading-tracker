import { AuthenticatedUser } from '../models/authenticated-user.model';
import * as AuthActions from '../actions/auth.action';

export const SIGNIN = 'SIGN_IN';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function authReducer(state: AuthenticatedUser[] = [], action: AuthActions.Actions) {
  switch (action.type) {
    case AuthActions.SIGNIN:
        return [...state, action.payload];
    default:
        return state;
    }
}
