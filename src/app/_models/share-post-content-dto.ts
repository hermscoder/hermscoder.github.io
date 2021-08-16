import {PostDetailsDto} from "./post-details-dto";

export class SharePostContentDto {
  authorizationCode: string;
  redirectUri: string;
  commentaryText: string;
  postUrl: string;


  constructor(authorizationCode: string, redirectUri: string, commentaryText: string, postUrl: string) {
    this.authorizationCode = authorizationCode;
    this.redirectUri = redirectUri;
    this.commentaryText = commentaryText;
    this.postUrl = postUrl;
  }
}
