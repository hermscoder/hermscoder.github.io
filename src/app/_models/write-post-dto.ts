import {UserSummarised} from "./user-summarised";
import {MediaDto} from "./media-dto";

export class WritePostDto {
  title: string;
  subTitle: string;
  readingTime: number;
  text: string;
  thumbnail: MediaDto;
  keyWords: string;


  constructor(title: string, subTitle: string, readingTime: number, text: string, thumbnail: MediaDto, keyWords: string) {
    this.title = title;
    this.subTitle = subTitle;
    this.readingTime = readingTime;
    this.text = text;
    this.thumbnail = thumbnail;
    this.keyWords = keyWords;
  }
}
