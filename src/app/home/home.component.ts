import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {ProfileDetailsDto} from "../_models/profile-details-dto";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {first} from "rxjs/operators";
import {PageScrollOptions, PageScrollService} from "ngx-page-scroll-core";
import {ROUTES} from "../routes";
import {MailService} from "../_services/mail.service";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {of} from "rxjs";
import {HttpEvent} from "@angular/common/http";
import {UploadResponse} from "@kolkov/angular-editor/lib/angular-editor.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  profile: ProfileDetailsDto | any = {};
  error: any = null;
  contactForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pageScrollService: PageScrollService,
              private mailService: MailService) {
    this.contactForm = new FormGroup({
      senderEmail: new FormControl(),
      senderName: new FormControl(),
      mailContent: new FormControl()
    })
  }

  ngOnInit(): void {
    this.router.navigate([ROUTES.HOME.url]);
    this.route.data.subscribe(data => {
      let resolvedData = data['profile'];
      if(resolvedData.data != null) {
        this.profile = resolvedData.data;
      } else {
        this.error = resolvedData.error;
      }
    });
  }

  ngAfterViewInit(): void {
    if(this.route.fragment){
      this.route.fragment.pipe(
        first()
      ).subscribe((fragment) => {
        this.pageScrollService.scroll({
          document: document,
          scrollTarget: '#' + fragment,
        });
      });
    }
  }

  onSubmitContactForm(): void {
    this.mailService.sendEmailMessage(this.contactForm.value).subscribe((res) => {
      //TODO Prompt success message
      this.contactForm.reset();
      alert("Email successfully sent!");
    }, (error => {
      //TODO Prompt error message
      alert(error);
    }));
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '100',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: false,
    showToolbar: false,
    placeholder: 'Enter text here...',
    defaultFontSize: "2",
    sanitize: false
  };
}
