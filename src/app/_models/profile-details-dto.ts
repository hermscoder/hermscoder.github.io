import {ExperienceDto} from "./experience-dto";

export class ProfileDetailsDto {
  id: string;
  givenName: string;
  familyName: string;
  birthDate: string;
  jobTitle: string;
  description: string;
  experiences: ExperienceDto [];


  constructor(id: string, givenName: string, familyName: string, birthDate: string, jobTitle: string, description: string, experiences: ExperienceDto[]) {
    this.id = id;
    this.givenName = givenName;
    this.familyName = familyName;
    this.birthDate = birthDate;
    this.jobTitle = jobTitle;
    this.description = description;
    this.experiences = experiences;
  }
}
