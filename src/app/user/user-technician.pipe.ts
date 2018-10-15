import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../core/models/user.model';

@Pipe({
  name: 'userTechnician'
})
export class UserTechnicianPipe implements PipeTransform {

  transform(value: any, filterString: string, propName:string): any {
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
