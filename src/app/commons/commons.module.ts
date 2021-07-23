import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from "./modal/modal.component";
import { DropdownComponent } from './dropdown/dropdown.component';
import { DateInputComponent } from './date-input/date-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ModalComponent, DropdownComponent, DateInputComponent],
    exports: [ModalComponent, DropdownComponent, DateInputComponent]
})
export class CommonsModule { }
