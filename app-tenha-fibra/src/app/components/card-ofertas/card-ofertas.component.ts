import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, map, of } from 'rxjs';
import { CompartilhamentoDadosService } from '../../shared/services/dados/compartilhamento-dados.service';
import { ConsultaOfertasService } from './../../shared/services/ofertas/consulta-ofertas.service';
import { environment } from '../../../environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContratacaoComponent } from '../contratacao/contratacao.component';

@Component({
  selector: 'app-card-ofertas',
  standalone: true,
  imports: [CommonModule],
  providers: [BsModalService],
  templateUrl: './card-ofertas.component.html',
  styleUrl: './card-ofertas.component.scss'
})
export class CardOfertasComponent implements OnInit {

  public oferta: any;
  public resultadosPorPagina = 4;
  public totalResultados = 0;
  public exibirQuantidade = 4;
  public currentPage: number = 1;
  public itemsPerPage: number = 4;
  public paginatedCatalogo: any[] = [];
  public pages: number[] = [];
  public modalRef!: BsModalRef<ContratacaoComponent>;

  constructor(private spinner: NgxSpinnerService, private dados: CompartilhamentoDadosService, private ofertas: ConsultaOfertasService, private router: Router,  private modalService: BsModalService) {

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
          this.paginateCatalogo();
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

    const initialState: Partial<ContratacaoComponent> = {
      input: 'input',
      currentCep: this.dados.getCep()
    };

    this.modalRef = this.modalService.show(ContratacaoComponent, {
      initialState,
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  assinarWhatsapp(item: any) {
    console.log('whatsapp', item);
    window.open(`https://wa.me/5551${environment.whatsappNumber}?text=Ol%C3%A1%2C+eu+vim+atrav%C3%A9s+do+site+e+quero+contratar+o+plano+${item.nome.replace(' ','+')}++R%24+${item.valores_plano.valor_oferta}`,'_blank');
  }

  exibirMaisResultados(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.exibirQuantidade += this.resultadosPorPagina;
      this.paginateCatalogo();
    }, 1500);
  }

  resetarExibicao(): void {
    this.exibirQuantidade = this.resultadosPorPagina;
  }

  paginateCatalogo(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCatalogo = this.oferta.catalogo.slice(start, end);

    const pageCount = Math.ceil(this.oferta.catalogo.length / this.itemsPerPage);
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.pages.length) {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.currentPage = page;
        this.paginateCatalogo();
      }, 500);
    }
  }
}