import {Component, ElementRef, Input, OnChanges, OnInit, Self, SimpleChanges, ViewChild} from '@angular/core';
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
  value: string = '';


  constructor(@Self() public ngControl: NgControl) {
    this.dateInputForm = new FormGroup({
      day: new FormControl(),
      month: new FormControl(),
      year: new FormControl()
    })
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    // this.initializeForm();
    this.updateFormControls();
    console.log("CALENDARIO INICIALIZOU");
  }

  initializeForm(){
    let day='', month='', year = '';
    // let pieces = this.ngControl.control?.value?.split('/');
    let pieces = this.value?.split('/');
    if(pieces && pieces.length == 3) {
      day = pieces[0];
      month = pieces[1];
      year = pieces[2];
    }

    this.dateInputForm.setValue({
      day: day,
      month: month,
      year: year
    });
  }


  processInput($event: any, input: HTMLInputElement, nextInput: HTMLInputElement | undefined = undefined): boolean {
    let maxLength = 0;
    if(['day', 'month'].indexOf(input.id) > -1){
      maxLength = 2;
    } else {
      maxLength = 4;
    }

    input.value = input.value.replace('.', '')
                                .replace(',','')
                                .replace('-','')
                                .replace('+','')
                                .replace('\\d', '');
    if(input.value.length >= maxLength){
      this.dateInputForm.value[input.id] = input.value = this.getCorrectValueIfNecessary(input);
    }
    this.updateNgControlValue();
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

  private updateFormControls(){

    let day='', month='', year = '';
    // let pieces = this.ngControl.control?.value?.split('/');
    let pieces = this.value?.split('/');
    if(pieces && pieces.length == 3) {
      day = pieces[0];
      month = pieces[1];
      year = pieces[2];
    }

    this.dateInputForm.setValue({
      day: day,
      month: month,
      year: year
    });
  }

  private getFullDate(form: FormGroup) {
    return form.value.day + '/'
      + form.value.month + '/'
      + form.value.year;
  }

  updateNgControlValue(){
    this.ngControl.control?.setValue(this.getFullDate(this.dateInputForm));
  }
  //ControlValueAccessor interface
  writeValue(value: any) {
    this.value = value;
    this.updateFormControls();
  }

  registerOnChange(fn: any) {}

  registerOnTouched(fn: any) { }

  setDisabledState?(isDisabled: boolean) { }

}
