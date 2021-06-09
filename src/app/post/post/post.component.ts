import {Component, Input, OnInit} from '@angular/core';
import {PostDto} from "../../_models/post-dto";

@Component({
  selector: 'hc-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: PostDto;

  constructor() { }

  ngOnInit(): void {
  }



}
