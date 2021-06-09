import {Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from "./modal.service";

@Component({
  selector: 'hc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() id!: string;
  private element:any;

  @Input() modalWidth: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if(!this.id) {
      console.error('modal must have an id');
      return;
    }
    this.element.style.display = 'none';

    // move element to bottom of page (just before the </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    //close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if(el.target.className === 'hc-modal') {
        this.close();
      }
    });

    //add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  //remove self from modal service then component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id)
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('hc-modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('hc-modal-open');
  }
}
