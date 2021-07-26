import {Component, Input, OnInit} from '@angular/core';
import {ProfileDetailsDto} from "../../_models/profile-details-dto";
import {FormControl, FormGroup} from "@angular/forms";
import {ModalService} from "../../commons";

@Component({
  selector: 'hc-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() profile: ProfileDetailsDto | undefined;
  @Input() editMode: boolean = false;

  addProjectForm: FormGroup;

  constructor(public modalService: ModalService) {
    this.addProjectForm = new FormGroup({
      id: new FormControl(),
      profileId: new FormControl(),
      title: new FormControl(),
      urlToProject: new FormControl(),
      description: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  navigateTo(urlToProject: string) {
    window.open(urlToProject);
  }

  addProject() {
    console.log(this.addProjectForm.value);
  }

  //TODO LER ARTIGO: https://medium.com/@tarekabdelkhalek/how-to-create-a-drag-and-drop-file-uploading-in-angular-78d9eba0b854
}
