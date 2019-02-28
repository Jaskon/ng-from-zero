import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstKey'
})
export class FirstKeyPipe implements PipeTransform {

  transform(value: Object): any {
    return Object.keys(value)[0];
  }

}
