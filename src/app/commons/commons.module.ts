import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from "./modal/modal.component";
import { DropdownComponent } from './dropdown/dropdown.component';
import { DateInputComponent } from './date-input/date-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UploaderComponent } from './uploader/uploader.component';
import {AppModule} from "../app.module";
import {DndDirective} from "./directives/dnd.directive";



@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ModalComponent, DropdownComponent, DateInputComponent, UploaderComponent, DndDirective],
    exports: [ModalComponent, DropdownComponent, DateInputComponent, UploaderComponent, DndDirective]
})
export class CommonsModule { }
