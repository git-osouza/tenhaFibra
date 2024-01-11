import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, map } from 'rxjs';
import { CompartilhamentoDadosService } from '../../shared/services/dados/compartilhamento-dados.service';
import { ConsultaOfertasService } from './../../shared/services/ofertas/consulta-ofertas.service';

@Component({
  selector: 'app-card-ofertas',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './card-ofertas.component.html',
  styleUrl: './card-ofertas.component.scss'
})
export class CardOfertasComponent implements OnInit {

  public oferta: any;

  constructor(private spinner: NgxSpinnerService, private dados: CompartilhamentoDadosService, private ofertas: ConsultaOfertasService) {

  }

  ngOnInit() {
    this.spinner.show();

    this.getOfertas().subscribe(
      (oferta: any) => {
        if (!oferta.error) {
          //this.oferta = oferta.catalogo.filter((item: any) => item.valores_plano !== undefined);
          this.oferta = oferta;
          this.spinner.hide();
          console.log('ofertas carregadas', this.oferta);
        }
      },
      (error) => {
        console.error('Error in request of offers', error);
      }
    );

  }

  getOfertas(): Observable<any> {
    let cep = this.dados.getCep();
    return this.ofertas.consultarOfertas(cep.cep).pipe(
      map((response => {
        return response;
      }))
    );
  }



}
