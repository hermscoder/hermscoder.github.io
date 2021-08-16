export class UserSummarised {
  id: string;
  name: string;
  jobTitle: string;
  linkedIn: string;
  instagram: string;


  constructor(id: string, name: string, jobTitle: string, linkedIn: string, instagram: string) {
    this.id = id;
    this.name = name;
    this.jobTitle = jobTitle;
    this.linkedIn = linkedIn;
    this.instagram = instagram;
  }
}
