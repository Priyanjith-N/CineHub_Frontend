import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: Date): string {
    const date: Date = new Date(value);
    return date.toDateString();
  }

}
