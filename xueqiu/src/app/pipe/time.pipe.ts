import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: any[]) {
    let time = new Date()
    time.setTime(value)
    return time;
  }

}
