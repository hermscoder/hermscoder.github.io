import {ExperienceDto} from "./experience-dto";
import {ProjectDto} from "./project-dto";



export class ProfileDetailsDto {
  id: string;
  givenName: string;
  familyName: string;
  birthDate: string;
  jobTitle: string;
  description: string;
  experienceList: ExperienceDto[];
  projectsList: ProjectDto[];


  constructor(id: string, givenName: string, familyName: string, birthDate: string, jobTitle: string, description: string, experienceList: ExperienceDto[], projectsList: ProjectDto[]) {
    this.id = id;
    this.givenName = givenName;
    this.familyName = familyName;
    this.birthDate = birthDate;
    this.jobTitle = jobTitle;
    this.description = description;
    this.experienceList = experienceList;
    this.projectsList = projectsList;
  }
}
