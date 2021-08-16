import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {ROUTES} from "../../routes";
import {PostDetailsDto} from "../../_models/post-details-dto";
import {LocalStorageService} from "ngx-webstorage";
import {SharePostService} from "../../_services/share-post.service";

@Component({
  selector: 'hc-linkedin-callback',
  templateUrl: './linkedin-callback.component.html',
  styleUrls: ['./linkedin-callback.component.css']
})
export class LinkedinCallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sharePostService: SharePostService) { }

  ngOnInit(): void {


    this.route.queryParams.subscribe(data => {
      let code = data['code'];
      if(code) {
        const customEvent = new CustomEvent(SharePostService.LINKEDIN_AUTHORIZED_SUCCESSFULLY_EVENT, { detail: {code: code} });
        window.opener.dispatchEvent(customEvent);
        window.close();
      }
    });

  }

}
