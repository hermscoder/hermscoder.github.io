import {ExperienceDto} from "./experience-dto";
import {ProjectDto} from "./project-dto";
import {UserSummarised} from "./user-summarised";
import {FormControl} from "@angular/forms";

export class ProfileDetailsDto {
  id: string;
  user: UserSummarised;
  givenName: string;
  familyName: string;
  birthDate: string;
  jobTitle: string;
  description: string;
  experienceList: ExperienceDto[];
  projectsList: ProjectDto[];
  linkedIn: string;
  instagram: string;
  twitter: string;


  constructor(id: string, user: UserSummarised, givenName: string, familyName: string, birthDate: string, jobTitle: string, description: string, experienceList: ExperienceDto[], projectsList: ProjectDto[], linkedIn: string, instagram: string, twitter: string) {
    this.id = id;
    this.user = user;
    this.givenName = givenName;
    this.familyName = familyName;
    this.birthDate = birthDate;
    this.jobTitle = jobTitle;
    this.description = description;
    this.experienceList = experienceList;
    this.projectsList = projectsList;
    this.linkedIn = linkedIn;
    this.instagram = instagram;
    this.twitter = twitter;
  }
}
