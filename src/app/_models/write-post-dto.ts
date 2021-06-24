import {UserSummarised} from "./user-summarised";

export class WritePostDto {
  id: string | undefined;
  title: string;
  subTitle: string;
  readingTime: number;
  text: string;


  constructor(id: string|undefined, title: string, subTitle: string, readingTime: number, text: string) {
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.readingTime = readingTime;
    this.text = text;
  }
}
