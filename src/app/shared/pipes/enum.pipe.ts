import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enum',
})
export class EnumPipe implements PipeTransform {
  transform(value: number, enumName: any): any {
    return enumName[value];
  }
}
