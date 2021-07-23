import {Component, ElementRef, Input, OnInit, Self, ViewChild} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgControl} from "@angular/forms";

@Component({
  selector: 'hc-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements OnInit,ControlValueAccessor  {

  @ViewChild('dayInput')
  dayInput: ElementRef | undefined;
  @ViewChild('monthInput')
  monthInput: ElementRef | undefined;
  @ViewChild('yearInput')
  yearInput: ElementRef | undefined;


  // @ts-ignore
  dateInputForm: FormGroup;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    let day='', month='', year = '';
    let pieces = this.ngControl.control?.value?.split('/');
    if(pieces && pieces.length == 3) {
      day = pieces[0];
      month = pieces[1];
      year = pieces[2];
    }

    this.dateInputForm = new FormGroup({
      day: new FormControl([day]),
      month: new FormControl([month]),
      year: new FormControl([year])
    })
  }


  processInput($event: any, input: HTMLInputElement, nextInput: HTMLInputElement | undefined = undefined): boolean {
    let maxLength = 0;
    if(['day', 'month'].indexOf(input.id) > -1){
      maxLength = 2;
    } else {
      maxLength = 4;
    }

    input.value =  input.value.replace('.', '')
                              .replace(',','')
                              .replace('-','')
                              .replace('+','')
                              .replace('\\d', '');
    if(input.value.length >= maxLength){
      input.value = this.getCorrectValueIfNecessary(input);

      //if the key pressed is a number and not a arrow key or etc
      if ($event.keyCode >= 48 && $event.keyCode <= 57) {
        let exceededInput = input.value.substr(maxLength, input.value.length);
        input.value = input.value.substr(0, maxLength);

        if(nextInput) {
          if(exceededInput) {
            nextInput.value = exceededInput;
          }
          nextInput.focus();
          return false;
        }
      }
    }
    this.updateFormControl();
    return true;
  }

  getCorrectValueIfNecessary(input: HTMLInputElement): string{
    let maxValue = 0;
    let minValue = 0;

    if('day' ==input.id){
      maxValue = 31;
      minValue = 1;
    } else if ('month' == input.id){
      maxValue = 12;
      minValue = 1;
    } else {
      maxValue = new Date().getFullYear();
      minValue = maxValue - 110;
    }
    let correctValue =  input.value;
    if(Number(correctValue) > maxValue) {
      return maxValue.toString();
    }

    if(Number(correctValue) < minValue) {
      return minValue.toString();
    }
    return correctValue;
  }

  updateFormControl(){
    this.ngControl.control?.setValue(this.dayInput?.nativeElement.value + '/'
      + this.monthInput?.nativeElement.value
      + '/' + this.yearInput?.nativeElement.value);
  }

  //ControlValueAccessor interface
  writeValue(obj: any) {  }

  registerOnChange(fn: any) { }

  registerOnTouched(fn: any) { }

  setDisabledState?(isDisabled: boolean) { }

}
