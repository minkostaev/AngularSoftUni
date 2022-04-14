import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  private now = new Date();

  transform(value: string): string {
    const then = new Date(value);

    const timePassed = this.now.getTime() - then.getTime();
    const miliseconds = 1000;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (timePassed < minute) {
      return `${Math.floor(timePassed / miliseconds)} seconds`;
    }

    if (timePassed < hour) {
      return `${Math.floor(timePassed / minute)} minutes`;
    }

    if (timePassed < day) {
      return `${Math.floor(timePassed / hour)} hours`;
    }

    if (timePassed < month) {
      return `${Math.floor(timePassed / day)} days`;
    }

    if (timePassed < year) {
      return `${Math.floor(timePassed / month)} month`;
    }

    return `${Math.floor(timePassed / year)} years`;
  }

}
