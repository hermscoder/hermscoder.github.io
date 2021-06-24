import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../_services/post.service";
import {PostDetailsDto} from "../../_models/post-details-dto";
import {WritePostDto} from "../../_models/write-post-dto";
import {AngularEditorComponent, AngularEditorConfig} from "@kolkov/angular-editor";
import {FileUploadService} from "../../_services/file-upload.service";
import {environment} from "../../../environments/environment";
import {Observable, of} from "rxjs";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {AngularEditorService, UploadResponse} from "@kolkov/angular-editor/lib/angular-editor.service";
import {ROUTES} from "../../routes";
import {EditPostDto} from "../../_models/edit-post-dto";

@Component({
  selector: 'hc-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent implements OnInit {
  ROUTES = ROUTES;

  postForm: FormGroup;
  private post: EditPostDto | undefined;

  @ViewChild('angularEditorComponent')
  angularEditorComponent: any | undefined;

  constructor(private activatedRoute:ActivatedRoute, private router: Router, private postService: PostService, private fileUploadService: FileUploadService) {
    this.postForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      subTitle: new FormControl(),
      readingTime: new FormControl(),
      text: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if(data['post']) {
        this.post = data['post'].data;
        this.postForm.patchValue(data['post'].data);
      }
    });
  }

  onSubmit() {
    let formValue = this.postForm.value;
    if(formValue.id) {
      this.postService.updatePost(new EditPostDto(
                                      formValue.id,
                                      formValue.title,
                                      formValue.subTitle,
                                      formValue.readingTime,
                                      formValue.text,
                                      this.post?.author)).subscribe(response => {
        this.router.navigate([ROUTES.POST_DETAILS.url, response.id]);
      }, error => console.log(error));
    } else {
      this.postService.createPost(new WritePostDto(
                                      undefined,
                                      formValue.title,
                                      formValue.subTitle,
                                      formValue.readingTime,
                                      formValue.text)).subscribe(response => {
        this.router.navigate([ROUTES.POST_DETAILS.url, response.id]);
      }, error => console.log(error));
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    ],
    //Fixing image upload
    upload: (file: File) => {
      this.fileUploadService.uploadFile(file).subscribe((response: any)=> {
        this.angularEditorComponent.editorService.insertImage(response.imageUrl);
      });
      return of<HttpEvent<UploadResponse>>();
    },
    uploadWithCredentials: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [    ['link',
      'unlink']]
  };
}
