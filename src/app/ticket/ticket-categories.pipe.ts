import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketCategories'
})
export class TicketCategoriesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
