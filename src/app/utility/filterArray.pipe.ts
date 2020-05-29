import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray',
  pure: false
})
export class FilterArrayPipe implements PipeTransform {
  transform(items: any[], filter: Object): any {
    if (!items) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out

    return items.filter(value => Object.keys(value).length !== 0);
  }
}
