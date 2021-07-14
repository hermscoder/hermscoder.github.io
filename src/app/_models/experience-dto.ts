export class ExperienceDto {
  id: string;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  local: string;
  description: string;


  constructor(id: string, jobTitle: string, companyName: string, startDate: string, endDate: string, local: string, description: string) {
    this.id = id;
    this.jobTitle = jobTitle;
    this.companyName = companyName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.local = local;
    this.description = description;
  }
}
