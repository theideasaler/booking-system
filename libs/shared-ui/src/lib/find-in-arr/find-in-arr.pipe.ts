import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findInArr'
})
export class FindInArrPipe implements PipeTransform {

  transform(arr: any[] | null, propName: string, value: any): unknown {
    if(arr == null) return false;
    return arr.some(e => e[propName] === value);
  }

}
