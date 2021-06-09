export class AuthenticationResponse {
  authenticationToken: string;
  user: any;


  constructor(authenticationToken: string, email: string) {
    this.authenticationToken = authenticationToken;
    this.user = email;
  }
}
