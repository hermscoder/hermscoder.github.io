import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from "./modal/modal.component";
import { DropdownComponent } from './dropdown/dropdown.component';
import { DateInputComponent } from './date-input/date-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UploaderComponent } from './uploader/uploader.component';
import {AppModule} from "../app.module";
import {DndDirective} from "./directives/dnd.directive";
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ModalComponent, DropdownComponent, DateInputComponent, UploaderComponent, DndDirective, LoaderComponent],
    exports: [ModalComponent, DropdownComponent, DateInputComponent, UploaderComponent, DndDirective, LoaderComponent]
})
export class CommonsModule { }
