import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {ProfileDetailsDto} from "../../_models/profile-details-dto";
import {ExperienceDto} from "../../_models/experience-dto";
import {FormControl, FormGroup} from "@angular/forms";
import {ModalService} from "../../commons";
import {ProfileService} from "../../_services/profile.service";
import {ModalComponent} from "../../commons/modal/modal.component";
import {AngularEditorConfig} from "@kolkov/angular-editor";

@Component({
  selector: 'hc-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {


  @Input() profile: ProfileDetailsDto | undefined;
  @Input() editMode: boolean = false;
  addExperienceForm: FormGroup;

  constructor(private modalService: ModalService, private profileService: ProfileService) {
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
  }

  submitExperienceForm(modalId: string){
    this.addExperienceForm.controls['profileId'].setValue(this.profile?.id);
    if(!this.addExperienceForm.value.id){
      this.addExperience(modalId);
    } else {
      this.updateExperience(modalId);
    }
  }

  private addExperience(modalId: string) {
    this.profileService.addExperience(this.addExperienceForm.value)
      .subscribe((res) => {
        let array = this.profile?.experienceList;
        // @ts-ignore
        this.profile?.experienceList = [res].concat(array);
        this.modalService.close(modalId);
      }, (error => {
        console.error(error);
      }))
  }

  private updateExperience(modalId: string) {
    this.profileService.updateExperience(this.addExperienceForm.value)
      .subscribe((res) => {
        let array = this.profile?.experienceList;
        // @ts-ignore
        //replacing old by updated element in the experienceList
        this.profile?.experienceList = array.map(x => [res].find(({ id }) => id === x.id) || x);
        this.modalService.close(modalId);
      }, (error => {
        console.error(error);
      }))
  }

  closeModal(modalId: string) {
    this.addExperienceForm.reset();
    this.modalService.close(modalId);
  }

  initializeNewExperienceModal(modalId: string) {
    this.addExperienceForm.reset();
    this.openModal(modalId)
  }

  openModal(modalId:string) {
    this.modalService.open(modalId);
  }

  editExperienceInformation(experience: ExperienceDto, modalId: string) {
    this.addExperienceForm.patchValue(experience);
    this.openModal(modalId);
  }
  editorConfig: AngularEditorConfig = {
    toolbarHiddenButtons: [[
      'heading',
      'fontName',
      'subscript',
      'superscript',

    ], [
      'insertVideo',
      'insertImage',
      'fontSize',
      'textColor',
      'htmlCode',
      'HTMLCode'
    ]],
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '100',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: false,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultFontSize: "7",
    sanitize: false
  };
}
