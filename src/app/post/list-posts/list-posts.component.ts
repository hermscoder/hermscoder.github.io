import { Component, OnInit } from '@angular/core';
import {PostService} from "../../_services/post.service";
import {PostForListDto} from "../../_models/post-for-list-dto";

@Component({
  selector: 'hc-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  posts: PostForListDto[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(){
    this.listWithPagination();
  }

  listWithPagination() {
    this.postService.listPosts().subscribe((posts: PostForListDto[]) => {
      this.posts = posts;
    }, errorResponse => {
      console.error(errorResponse);
    });
  }


}
