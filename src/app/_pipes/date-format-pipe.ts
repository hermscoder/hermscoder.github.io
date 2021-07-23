import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'dateToStrFormat'})
export class DateFormatPipe implements PipeTransform {
  static MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  transform(dateStr: string, format: string): string {
    let pieces = dateStr.split('/');
    let day='', month='', year = '';
    if(pieces.length > 1) {
      day = pieces[0];
      month = pieces[1];
      year = pieces[2];
    } else {
      pieces = dateStr.split('-');
      if(pieces.length > 1) {
        day = pieces[2];
        month = pieces[1];
        year = pieces[0];
      }
    }

    let result = '';
    if (format ==='yyyy-MM-DD') {
      result = year + "-" + month + "-" + day;
    } else if (format ==='MMM DD') {
      result = DateFormatPipe.MONTHS[parseInt(month)-1] + ' ' + day;
    } else if (format ==='MMM yyyy') {
      result = DateFormatPipe.MONTHS[parseInt(month)-1] + ' ' + year;
    } else {
      result = 'Invalid format';
    }
    return result;
  }

  stringToDate(dateStr: any): Date {
    let pieces = dateStr.split('/');
    let day, month, year;
    if(pieces.length > 1) {
      day = pieces[0];
      month = pieces[1];
      year = pieces[2];
    } else {
      pieces = dateStr.split('-');
      if(pieces.length > 1) {
        day = pieces[2];
        month = pieces[1];
        year = pieces[0];
      }
    }

    let result = new Date(year + '-' + month  + '-' + day);

    return result;
  }
}
