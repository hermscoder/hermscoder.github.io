import {UserSummarised} from "./user-summarised";

export class PostDetailsDto {
  id: string;
  title: string;
  author: UserSummarised;
  date: string;
  subTitle: string;
  readingTime: number;
  text: string;


  constructor(id: string, title: string, author: UserSummarised, date: string, subTitle: string, readingTime: number, text: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.date = date;
    this.subTitle = subTitle;
    this.readingTime = readingTime;
    this.text = text;
  }
}
