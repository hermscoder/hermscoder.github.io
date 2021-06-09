import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hc-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  private element: any;
  private dropDownContentDiv: any;
  @Input() dropDownToggle: any;
  @Input() dropDownDirection: string = 'left bottom';

  constructor(private el: ElementRef<any>) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    console.log(this.element.children);

    if(this.element) {
      this.dropDownContentDiv = this.element.firstElementChild.firstElementChild;
    }

    if(!this.dropDownToggle) {
      console.error('You should provide a drop down toggle')
      return;
    }

    let that = this;
    this.dropDownToggle.addEventListener('click', (el: any) => {
      that.show();
    });
    console.log(this.dropDownToggle.eventListeners());
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedInside = this.element.contains(targetElement);
    const clickedOnToggle = this.dropDownToggle === targetElement;
    if (!clickedInside && !clickedOnToggle) {
      this.hide();
    }
  }
  show(){
    console.log(this.dropDownContentDiv);
    this.dropDownContentDiv.style.display = 'block';
  }

  hide(){
    console.log(this.dropDownContentDiv);
    this.dropDownContentDiv.style.display = 'none';
  }


}
