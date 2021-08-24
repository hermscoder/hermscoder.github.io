import {Injectable} from '@angular/core';
import {PostDetailsDto} from "../_models/post-details-dto";
import {SocialMedia} from "../_models/social-media";
import {PostShareParams} from "../_models/post-share-params";
import {LocalStorageService} from "ngx-webstorage";
import {environment} from "../../environments/environment";
import {ProjectDto} from "../_models/project-dto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SharePostContentDto} from "../_models/share-post-content-dto";

@Injectable({
  providedIn: 'root'
})
export class SharePostService {

  public static LINKEDIN_AUTHORIZED_SUCCESSFULLY_EVENT: string = 'userAuthorizedSuccessfully';
  private static LINKEDIN_REDIRECT_PATH: string = '/callback/linkedin';

  readonly POST_RESOURCE = 'post';
  readonly LINKEDIN_SHARE_RESOURCE = 'share/linkedin';
  readonly BASE_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  sharePostOnLinkedin(postId: string, sharePostContentDto: SharePostContentDto): Observable<any>{
    return this.httpClient.post<any>(this.BASE_URL + this.POST_RESOURCE + '/' + postId + '/'
      + this.LINKEDIN_SHARE_RESOURCE, sharePostContentDto);
  }

  getLinkedinRedirectURI(): string {
    return window.location.origin + SharePostService.LINKEDIN_REDIRECT_PATH;
  }

  sharePostOnTwitter(post:PostDetailsDto): boolean{
    const windowFeatures = "width=800,height=500,left=200,top=5,scrollbars,toolbar=0,resizable";
    window.open(this.buildUrl(SocialMedia.TWITTER,
      new PostShareParams(
        'http%3A%2F%2Flocalhost%3A4200',
        encodeURIComponent(window.location.href),
        post.title,
        post.author?.instagram,
        post.author?.linkedIn,
        this.getUniqueId(4))), 'SharePostWindow', windowFeatures, true);

    return false;
  }

  async getLinkedinAuthorizationCode(post:PostDetailsDto): Promise<any> {
    const windowFeatures = "width=800,height=500,left=200,top=5,scrollbars,toolbar=0,resizable";
    window.open(this.buildUrl(SocialMedia.LINKEDIN,
      new PostShareParams(
        encodeURIComponent(this.getLinkedinRedirectURI()),
        encodeURIComponent(window.location.href),
        post.title,
        post.author?.instagram,
        post.author?.linkedIn,
        this.getUniqueId(4))), 'SharePostWindow', windowFeatures, true);

    return await new Promise(resolve => window.addEventListener(SharePostService.LINKEDIN_AUTHORIZED_SUCCESSFULLY_EVENT, resolve));
  }

  sharePostMobile(post:PostDetailsDto){
    const shareData = {
      title: post.title,
      text: post.subTitle,
      url: window.location.href,

    }
    navigator.share(shareData)
      .then(() => console.log('Share was successful.'))
      .catch((error) => console.log('Sharing failed', error));
  }

  getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

  buildUrl(socialMedia: SocialMedia, params: any): string {
    var str = socialMedia.toString();
    var matchParams = str.match(/\{([^}]*)\}/g);
    if(matchParams){
      for (var i=0; i< matchParams.length; i++) {
        var paramField = matchParams[i].replace('{', '').replace('}', '');
        if(paramField) {
          str = str.replace(matchParams[i], params[paramField])
        }
      }
    }
    return str
  }
}
