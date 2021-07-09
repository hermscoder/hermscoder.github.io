export class MediaDto {
  id: string;
  type: string;
  url: string;

  constructor(id: string, type: string, url: string) {
    this.id = id;
    this.type = type;
    this.url = url;
  }
}
