import {UserSummarised} from "./user-summarised";

export class EditPostDto {
  id: string | undefined;
  title: string;
  subTitle: string;
  readingTime: number;
  text: string;
  author: UserSummarised | undefined;


  constructor(id: string, title: string, subTitle: string, readingTime: number, text: string, author: UserSummarised | undefined) {
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.readingTime = readingTime;
    this.text = text;
    this.author = author;
  }
}
