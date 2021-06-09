export class AuthenticationResponse {
  authenticationToken: string;
  email: string;


  constructor(authenticationToken: string, email: string) {
    this.authenticationToken = authenticationToken;
    this.email = email;
  }
}
