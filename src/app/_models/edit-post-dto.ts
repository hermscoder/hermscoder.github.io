import {UserSummarised} from "./user-summarised";
import {MediaDto} from "./media-dto";

export class EditPostDto {
  id: string | undefined;
  title: string;
  subTitle: string;
  readingTime: number;
  text: string;
  author: UserSummarised | undefined;
  thumbnail: MediaDto;
  keyWords: string;


  constructor(id: string | undefined, title: string, subTitle: string, readingTime: number, text: string, author: UserSummarised | undefined, thumbnail: MediaDto, keyWords: string) {
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.readingTime = readingTime;
    this.text = text;
    this.author = author;
    this.thumbnail = thumbnail;
    this.keyWords = keyWords;
  }
}
