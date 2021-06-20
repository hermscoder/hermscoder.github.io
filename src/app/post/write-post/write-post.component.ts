import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'hc-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private router: Router) {
    this.postForm = new FormGroup({
      title: new FormControl(),
      subTitle: new FormControl(),
      readingTime: new FormControl(),
      text: new FormControl(),
    })
  }

  ngOnInit(): void {
  }

}
