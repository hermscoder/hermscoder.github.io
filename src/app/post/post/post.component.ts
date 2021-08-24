import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostDetailsDto} from "../../_models/post-details-dto";
import {ROUTES} from "../../routes";
import {SocialMedia} from "../../_models/social-media";
import {AuthService} from "../../_services/auth.service";
import {SharePostService} from "../../_services/share-post.service";
import {ModalService} from "../../commons";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'hc-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @ViewChild('sharePostOnLinkedInComponent')
  sharePostOnLinkedInComponent: any | undefined;

  ROUTES = ROUTES;
  post: PostDetailsDto | any = {};
  error: any = null;

  socialMedia = SocialMedia;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private sharePostService: SharePostService,
              public modalService: ModalService,
              private meta: Meta) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      let resolvedData = data['post'];
      if(resolvedData.data != null) {
        this.post = resolvedData.data;

        this.meta.addTags([
          { name: 'og:title', content: this.post.title },
          { name: 'og:description', content: this.post.subTitle },
          { name: 'og:image', content: this.post.thumbnail.url },
          { name: 'og:url', content: window.location.href}
        ]);

      } else {
        this.error = resolvedData.error;
      }
    });
  }

  isMobileDevice() {
    return window.outerWidth <= 800 && window.outerHeight <= 830;
  }

  sharePostMobile(post:PostDetailsDto){
    this.sharePostService.sharePostMobile(post);
  }

  sharePostOnTwitter(post:PostDetailsDto): boolean{
    return this.sharePostService.sharePostOnTwitter(post);
  }

  sharePostOnLinkedin(post:PostDetailsDto) {
    this.sharePostService.getLinkedinAuthorizationCode(post)
      .then(event => {
        if(event.detail.code) {
          this.sharePostOnLinkedInComponent.shareLinkedinParams = {
            authorizationCode: event.detail.code,
            redirectUri: this.sharePostService.getLinkedinRedirectURI()
          };
          this.modalService.open('sharePostOnLinkedInModal');
        }
      });
  }


  canEdit() {
    return this.authService.isAuthenticated();
  }
}
