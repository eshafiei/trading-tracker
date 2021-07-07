export interface AuthenticatedUser {
  jwtToken: string;
  authTime: number;
  givenName: string;
  familyName: string;
  userId: string;
}
