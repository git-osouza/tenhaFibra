import { CommonModule } from '@angular/common';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format.pipe';
import { environment } from './../../../environments/environment';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PhoneFormatPipe, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  apiWhatsapp: string = `${environment.apiWhatsapp}${environment.whatsappNumber}`;
  whatsappNumber: string = environment.whatsappNumber;
  isMobileMenuOpen: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  toggleMobileMenu() {
    console.log('aqui');
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }


}
