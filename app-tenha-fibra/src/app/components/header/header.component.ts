import { PhoneFormatPipe } from '../../shared/pipes/phone-format.pipe';
import { environment } from './../../../environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PhoneFormatPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  apiWhatsapp: string = `${environment.apiWhatsapp}${environment.whatsappNumber}`;
  whatsappNumber: string = environment.whatsappNumber;
}
