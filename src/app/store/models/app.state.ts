import { AuthenticatedUser } from './authenticated-user.model';

export interface AppState {
  readonly authenticatedUser: AuthenticatedUser[];
}
