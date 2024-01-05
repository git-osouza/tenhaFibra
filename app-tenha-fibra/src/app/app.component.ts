import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardOfertasComponent } from './components/card-ofertas/card-ofertas.component';
import { ConsultaCepComponent } from './components/consulta-cep/consulta-cep.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { Cep } from './shared/models/cep.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent, CardOfertasComponent, ConsultaCepComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{

  public currentCep?: Cep;
  
  constructor() { }
  
  ngOnInit(): void {
    
  }

  ofertas = [
    {
      popular: true,
      provedorImagem: 'caminho/do/oi.png',
      megas: 100,
      tipoTecnologia: 'fibra',
      wifiIncluso: true,
      streamings: 'Netflix, Amazon Prime',
      valor: 79.99,
      cobertura: true
    },
    {
      popular: false,
      provedorImagem: 'caminho/do/vivo.png',
      megas: 50,
      tipoTecnologia: 'cabo',
      wifiIncluso: false,
      streamings: 'YouTube, Spotify',
      valor: 59.99,
      cobertura: false
    }  ];

  handleCepChange(cep: Cep){
    if(cep){
      this.currentCep = cep;
    }
  }
}
