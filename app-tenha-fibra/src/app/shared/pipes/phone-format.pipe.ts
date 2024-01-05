import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    const prefix = value.substring(0, 4);
    const code = value.substring(4, 7);
    const number = value.substring(7, 11)

    return `${prefix} ${code} ${number}`;
  }
}
