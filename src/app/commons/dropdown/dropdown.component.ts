import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hc-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  private readonly element: any;
  private dropDownContentDiv: any;
  @Input() dropDownToggle: any;
  @Input() dropDownDirection: string = 'left bottom';

  constructor(private el: ElementRef<any>) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
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
    this.dropDownContentDiv.style.display = 'block';
  }

  hide(){
    this.dropDownContentDiv.style.display = 'none';
  }


}
