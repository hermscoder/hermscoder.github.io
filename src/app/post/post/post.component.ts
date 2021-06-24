import {Component, Input, OnInit} from '@angular/core';
import {PostForListDto} from "../../_models/post-for-list-dto";
import {ActivatedRoute} from "@angular/router";
import {PostDetailsDto} from "../../_models/post-details-dto";
import {ResolvedData} from "../../_models/resolved-data";
import {ROUTES} from "../../routes";

@Component({
  selector: 'hc-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  ROUTES = ROUTES;
  post: PostDetailsDto | any = {};
  error: any = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      let resolvedData = data['post'];
      if(resolvedData.data != null) {
        this.post = resolvedData.data;
      } else {
        this.error = resolvedData.error;
      }
    });
  }

}
