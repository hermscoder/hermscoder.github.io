import {MediaDto} from "./media-dto";

export class ProjectDto {
  id: string;
  title: string;
  thumbnail: MediaDto;
  description: string;
  urlToProject: string;
  profileId: number;

  constructor(id: string, title: string, thumbnail: MediaDto, description: string, urlToProject: string, profileId: number) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.description = description;
    this.urlToProject = urlToProject;
    this.profileId = profileId;
  }
}
