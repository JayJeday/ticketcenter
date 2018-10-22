import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketStatus'
})
export class TicketStatusPipe implements PipeTransform {

  transform(value: any, filterString: string, propName:string): any {
    console.log(propName);
    console.log(filterString);
    if (propName === 'SelectAll' || filterString === '' || propName==='DateAll') {
      return value;
    }

    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
