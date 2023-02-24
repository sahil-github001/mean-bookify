import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../api.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private api: ApiService) { }

  transform(allProducts: [], searchKey: string, propName: string): any[] {

    let result: any = [];
    let count = 0;
    let emptyArray = [];

    if (!allProducts || searchKey == '' || propName == '') {
      this.api.noResultFound.next('0')
      return allProducts
    }

    allProducts.forEach((product: any) => {

      if (product.name.trim().toLowerCase().includes(searchKey.toLowerCase())) {
        result.push(product);
      }

      if (result.length == 0) {
        this.api.noResultFound.next('1')
      } else {
        this.api.noResultFound.next('0')
      }
    })
    
    return result;
  }

}
