import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-informacao',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './informacao.component.html',
  styleUrl: './informacao.component.scss'
})
export class InformacaoComponent {

  public itemsPerSlide = 4;
  public cycleInterval = 1350;
  public slides = [
    { image: 'assets/img/vivo-logo.webp'},
    { image: 'assets/img/Logos_tim.png'},
    { image: 'assets/img/oi-logo.webp'},
    { image: 'assets/img/sky.webp'},
    { image: 'assets/img/vivo-logo.webp'},
    { image: 'assets/img/Logos_tim.png'},
    { image: 'assets/img/oi-logo.webp'},
    { image: 'assets/img/sky.webp'},
  ];

}
