import { Component, OnInit } from '@angular/core';
import {PostService} from "../../_services/post.service";
import {PostDto} from "../../_models/post-dto";

@Component({
  selector: 'hc-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  posts: PostDto[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(){
    this.listWithPagination();
  }

  listWithPagination() {
    this.postService.listPosts().subscribe((posts: PostDto[]) => {
      this.posts = posts;
    }, errorResponse => {
      console.error(errorResponse);
    });
  }


}
