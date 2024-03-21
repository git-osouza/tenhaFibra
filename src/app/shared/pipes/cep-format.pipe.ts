import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepFormat',
  standalone: true
})
export class CepFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const cep = value.replace(/\D/g, '');

    if (cep.length === 8) {
      return cep.substring(0, 5) + '-' + cep.substring(5);
    }

    return value;
  }
}
