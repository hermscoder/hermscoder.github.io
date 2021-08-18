import {UserSummarised} from "./user-summarised";
import {MediaDto} from "./media-dto";

export class PostForListDto {
  id: string;
  title: string;
  author: UserSummarised;
  date: string;
  subTitle: string;
  readingTime: number;
  text: string;
  thumbnail: MediaDto;


  constructor(id: string, title: string, author: UserSummarised, date: string, subTitle: string, readingTime: number, text: string, thumbnail: MediaDto) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.date = date;
    this.subTitle = subTitle;
    this.readingTime = readingTime;
    this.text = text;
    this.thumbnail = thumbnail;
  }
}
