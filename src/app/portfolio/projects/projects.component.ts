import {Component, Input, OnInit} from '@angular/core';
import {ProfileDetailsDto} from "../../_models/profile-details-dto";
import {FormControl, FormGroup} from "@angular/forms";
import {ModalService} from "../../commons";
import {ProfileService} from "../../_services/profile.service";
import {ProjectDto} from "../../_models/project-dto";

@Component({
  selector: 'hc-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() profile: ProfileDetailsDto | undefined;
  @Input() editMode: boolean = false;

  addProjectForm: FormGroup;

  constructor(private modalService: ModalService, private profileService: ProfileService) {
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

  openModalForAddingNewProject(modalId: string) {
    this.addProjectForm.controls['thumbnail'].setValue(null);
    this.addProjectForm.reset();
    this.modalService.open(modalId);
  }

  closeModal(modalId: string) {
    this.modalService.close(modalId);
  }

  submitProjectForm(modalId: string) {
    this.addProjectForm.controls['profileId'].setValue(this.profile?.id);
    if(!this.addProjectForm.value.id){
      this.addProject(modalId);
    } else {
      this.updateProject(modalId);
    }
  }

  addProject(modalId: string) {
    this.profileService.addProject(this.addProjectForm.value).subscribe((res) => {
      let array = this.profile?.projectsList;
      // @ts-ignore
      this.profile?.projectsList = [res].concat(array);
      this.addProjectForm.reset();
      this.closeModal(modalId);
    }, (error => {
      console.error(error);
    }))
  }

  updateProject(modalId: string){
    this.profileService.updateProject(this.addProjectForm.value).subscribe((res) => {
      let array = this.profile?.projectsList;
      // @ts-ignore
      //replacing old by updated element in the projectsList
      this.profile?.projectsList = array.map(x => [res].find(({ id }) => id === x.id) || x);
      this.closeModal(modalId);
      this.addProjectForm.reset();
    }, (error => {
      console.error(error);
    }))
  }

  changeProjectThumbnail(data: any) {
    this.addProjectForm.controls['thumbnail'].setValue(data);
    this.addProjectForm.controls['thumbnail'].markAsDirty();
  }

  editProjectInformation(project: ProjectDto, id: string) {
    this.addProjectForm.patchValue(project);
    this.modalService.open(id);
  }
}
