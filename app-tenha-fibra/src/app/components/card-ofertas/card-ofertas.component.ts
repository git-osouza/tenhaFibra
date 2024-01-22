import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, map, of } from 'rxjs';
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
  public resultadosPorPagina = 5;
  public totalResultados = 0;
  public exibirQuantidade = 5;

  constructor(private spinner: NgxSpinnerService, private dados: CompartilhamentoDadosService, private ofertas: ConsultaOfertasService, private router: Router) {

  }

  ngOnInit() {
    this.spinner.show();

    this.getOfertas().subscribe(
      (oferta: any) => {
        if (oferta) {
          let result: any = {};
          oferta.catalogo.forEach((item: any) => {
            if (result[item.nome] == null) {
              result[item.nome] = item;
            }
          });
          let res = Object.keys(result);
          oferta.catalogo = res.map(function (item) { return result[item]; });
          this.oferta = oferta;
          this.spinner.hide();
          console.log('ofertas carregadas', this.oferta);
        } else {
          if (!this.oferta) {
            this.router.navigate(['/home']);
          }
        }
      },
      (error) => {
        console.error('Error in request of offers', error);
      }
    );

  }

  getOfertas(): Observable<any> {
    let cep = this.dados.getCep();
    if (cep) {
      return this.ofertas.consultarOfertas(cep.cep).pipe(
        map((response => {
          return response;
        }))
      );
    }
    return of(null);
  }

  alterarEndereco() {
    this.router.navigate(['/home']);
  }

  assinarAgora(item: any) {
    console.log('online', item);
    this.router.navigate(['/contratacao']);
  }

  assinarWhatsapp(item: any) {
    console.log('whatsapp', item);
  }

  exibirMaisResultados(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.exibirQuantidade += this.resultadosPorPagina;
    }, 1500);
  }

  resetarExibicao(): void {
    this.exibirQuantidade = this.resultadosPorPagina;
  }

}