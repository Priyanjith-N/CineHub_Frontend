import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormaterToLocalString',
  standalone: true
})
export class DateFormaterToLocalStringPipe implements PipeTransform {

  transform(value: Date): string {
    if(!value) return '';
    
    const date: Date = new Date(value);

    const formattedDate: string = date.toLocaleString('en-US', {
      weekday: 'long', // Gets the full weekday name (e.g., "Sunday")
      month: 'long', // Gets the full month name (e.g., "June")
      day: 'numeric', // Gets the day of the month as a number (e.g., "16")
      year: 'numeric' // Gets the year as a number (e.g., "2024")
    });

    return formattedDate;
  }

}
