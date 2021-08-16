export class PostShareParams {
  rootUrl: string;
  postUrl: string;
  postTitle: string;
  authorTwitter: string;
  authorLinkedin: string;
  stateLinkedIn: string;


  constructor(rootUrl: string, postUrl: string, postTitle: string, authorTwitter: string, authorLinkedin: string, stateLinkedIn: string) {
    this.rootUrl = rootUrl;
    this.postUrl = postUrl;
    this.postTitle = postTitle;
    this.authorTwitter = authorTwitter;
    this.authorLinkedin = authorLinkedin;
    this.stateLinkedIn = stateLinkedIn;
  }
}
