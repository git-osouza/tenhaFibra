import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-ofertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-ofertas.component.html',
  styleUrl: './card-ofertas.component.scss'
})
export class CardOfertasComponent {
  @Input() oferta: any;
}
