import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {

  transform(value: string): string {
    const startEndTime: string[] = value.split(':').map((val) => val.trim());

    const hour = Number(startEndTime[0]);

    let newHour: number = hour;

    if(hour > 12) {
      newHour = hour - 12;
    }

    const newValue: string = `${(newHour < 10)?('0' + newHour): newHour}: ${startEndTime[1]}`;

    if(hour >= 12) {
      return `${newValue} PM`;
    }

    return `${newValue} AM`;
  }

}
