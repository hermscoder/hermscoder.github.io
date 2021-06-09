import {Component, Input, OnInit} from '@angular/core';
import {PostDto} from "../../_models/post-dto";

@Component({
  selector: 'hc-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post!: PostDto;
  constructor() { }

  ngOnInit(): void {
  }

}
