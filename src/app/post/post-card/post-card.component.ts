import {Component, Input, OnInit} from '@angular/core';
import {PostForListDto} from "../../_models/post-for-list-dto";
import {NavigationExtras, Router} from "@angular/router";
import {ROUTES} from "../../routes";

@Component({
  selector: 'hc-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post!: PostForListDto;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(id: any){
    this.router.navigate([ROUTES.POST_DETAILS.url, id]);
  }

}

