import {Component, Input, OnInit} from '@angular/core';
import {ProfileDetailsDto} from "../../_models/profile-details-dto";
import {FormControl, FormGroup} from "@angular/forms";
import {ModalService} from "../../commons";
import {ProfileService} from "../../_services/profile.service";

@Component({
  selector: 'hc-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() profile: ProfileDetailsDto | undefined;
  @Input() editMode: boolean = false;

  addProjectForm: FormGroup;

  constructor(public modalService: ModalService, private profileService: ProfileService) {
    this.addProjectForm = new FormGroup({
      id: new FormControl(),
      profileId: new FormControl(),
      title: new FormControl(),
      urlToProject: new FormControl(),
      description: new FormControl(),
      thumbnail: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  navigateTo(urlToProject: string) {
    window.open(urlToProject);
  }

  addProject() {
    this.addProjectForm.controls['profileId'].setValue(this.profile?.id);
    this.profileService.addProject(this.addProjectForm.value).subscribe((res) => {
      let array = this.profile?.projectsList;
      // @ts-ignore
      this.profile?.projectsList = [res].concat(array);
      this.addProjectForm.reset();
      this.modalService.close('addProjectModal');
    }, (error => {
      console.error(error);
    }))
  }

  changeProjectThumbnail(data: any) {
    this.addProjectForm.controls['thumbnail'].setValue(data);
  }
}
