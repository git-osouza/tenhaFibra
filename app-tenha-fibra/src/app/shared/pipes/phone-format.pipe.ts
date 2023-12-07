import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    const areaCode = value.substring(2, 4);
    const phoneNumber = value.substring(4);

    return `(${areaCode}) ${phoneNumber}`;
  }
}
