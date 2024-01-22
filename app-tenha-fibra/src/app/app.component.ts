import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CardOfertasComponent } from './components/card-ofertas/card-ofertas.component';
import { ConsultaCepComponent } from './components/consulta-cep/consulta-cep.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InformacaoComponent } from './components/informacao/informacao.component';
import { ConsultaOfertasService } from './shared/services/ofertas/consulta-ofertas.service';
import { ContratacaoComponent } from './components/contratacao/contratacao.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent, CardOfertasComponent, ConsultaCepComponent, HttpClientModule, NgxSpinnerModule, InformacaoComponent, ContratacaoComponent],
  templateUrl: './app.component.html',
  providers:[ConsultaOfertasService, NgxSpinnerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{

  constructor(private consultaOfertasService: ConsultaOfertasService, private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  consultarPlanosByCep(){
      this.consultaOfertasService.consultarOfertas('93542510').subscribe(
        (data: any) => {
          if (!data.erro) {
            console.log(data);
          } else {
            console.log('encontrado.');
          }
        },
        (error) => {
          console.log('Ocorreu um erro na consulta do CEP.');
          console.error(error);
        }
      );
  }

}
