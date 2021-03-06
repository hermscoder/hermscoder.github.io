import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostDetailsDto} from "../../_models/post-details-dto";
import {SharePostService} from "../../_services/share-post.service";
import {SharePostContentDto} from "../../_models/share-post-content-dto";

@Component({
  selector: 'hc-share-linkedin',
  templateUrl: './share-linkedin.component.html',
  styleUrls: ['./share-linkedin.component.css']
})
export class ShareLinkedinComponent implements OnInit {

  @Output() onCancel = new EventEmitter();
  @Output() onShareSuccessfully = new EventEmitter();

  @Input() shareLinkedinParams!: ShareLinkedinParams;

  @Input() post!: PostDetailsDto;

  sharedOnLinkedInForm: FormGroup;
  loadingShare: boolean = false;

  constructor(private sharePostService: SharePostService) {
    this.sharedOnLinkedInForm = new FormGroup({
      postText: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loadingShare = true;
    this.sharePostService.sharePostOnLinkedin(this.post.id,
      new SharePostContentDto(
        this.shareLinkedinParams.authorizationCode,
        this.shareLinkedinParams.redirectUri,
        this.sharedOnLinkedInForm.value.postText,
        window.location.href)).subscribe((res) => {
          this.loadingShare = false;
          window.open(res.postUrl);
          this.sharedOnLinkedInForm.reset();
          this.onShareSuccessfully.emit();
    }, error => {
          this.loadingShare = false;
          console.error(error)
    });

  }

  getCurrentUrl(): string{
    return window.location.href;
  }

  cancel() {
    this.onCancel.emit();
  }
}

export class ShareLinkedinParams {
  authorizationCode: string = '';
  redirectUri: string = '';
}
