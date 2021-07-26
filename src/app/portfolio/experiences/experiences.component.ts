import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {ProfileDetailsDto} from "../../_models/profile-details-dto";
import {ExperienceDto} from "../../_models/experience-dto";
import {Renderer} from "@angular/compiler-cli/ngcc/src/rendering/renderer";
import {FormControl, FormGroup} from "@angular/forms";
import {ModalService} from "../../commons";
import {ProfileService} from "../../_services/profile.service";
import {ModalComponent} from "../../commons/modal/modal.component";

@Component({
  selector: 'hc-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {


  @Input() profile: ProfileDetailsDto | undefined;
  @Input() editMode: boolean = false;
  addExperienceForm: FormGroup;

  constructor(public modalService: ModalService, private profileService: ProfileService) {
    this.addExperienceForm = new FormGroup({
      id: new FormControl(),
      profileId: new FormControl(),
      jobTitle: new FormControl(),
      companyName: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      local: new FormControl(),
      description: new FormControl(),
    });
  }

  ngOnInit(): void {
    console.log('INITIALIZING');
  }

  navigateTo(urlToProject: string) {
    window.open(urlToProject);
  }

  addExperience() {
    this.addExperienceForm.value.profileId = this.profile?.id;
    console.log(this.addExperienceForm.value);
    this.profileService.addExperience(this.addExperienceForm.value)
      .subscribe((res) => {
        let array = this.profile?.experienceList;
        // @ts-ignore
        this.profile?.experienceList = [res].concat(array);
        // this.profile?.experienceList?.push(res);
        this.modalService.close('addExperienceModal');
      }, (error => {
        console.error(error);
      }))
  }

  initializeExperienceModal(addExperienceModal: ModalComponent) {
    this.addExperienceForm.reset();
    this.modalService.open(addExperienceModal.id);
  }
}
