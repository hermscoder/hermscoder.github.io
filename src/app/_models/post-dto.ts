import {UserSummarised} from "./user-summarised";

export class PostDto {
  id: string;
  title: string;
  author: UserSummarised;
  date: string;
  text: string;


  constructor(id: string, title: string, author: UserSummarised, date: string, text: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.date = date;
    this.text = text;
  }
}
