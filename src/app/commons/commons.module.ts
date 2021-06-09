import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from "./modal/modal.component";
import { DropdownComponent } from './dropdown/dropdown.component';



@NgModule({
  imports: [CommonModule],
  declarations: [ModalComponent, DropdownComponent],
  exports: [ModalComponent, DropdownComponent]
})
export class CommonsModule { }
