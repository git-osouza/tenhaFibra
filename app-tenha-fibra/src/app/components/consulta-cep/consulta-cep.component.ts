import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CepFormatPipe } from '../../shared/pipes/cep-format.pipe';
import { ConsultaCepService } from './../../shared/services/cep/consulta-cep.service';
import { CompartilhamentoDadosService } from '../../shared/services/dados/compartilhamento-dados.service';
import { CommonModule } from '@angular/common';
import { InformacaoComponent } from '../informacao/informacao.component';


@Component({
  selector: 'app-consulta-cep',
  standalone: true,
  imports: [CepFormatPipe, FormsModule, CommonModule, InformacaoComponent],
  providers: [ConsultaCepService],
  templateUrl: './consulta-cep.component.html',
  styleUrl: './consulta-cep.component.scss'
})
export class ConsultaCepComponent implements OnInit{

  constructor(private consultaCepService: ConsultaCepService, private router: Router, private dados: CompartilhamentoDadosService) { }

  public cep: string = '';


  ngOnInit(): void {
  }

  consultarCep() {
    if (this.cep) {
      this.consultaCepService.consultarCEP(this.cep).subscribe(
        (data: any) => {
          if (!data.erro) {
            console.log(data);
            this.dados.setCep(data);
            this.router.navigate(['/ofertas']);
          } else {
            console.log('CEP não encontrado.');
          }
        },
        (error) => {
          console.log('Ocorreu um erro na consulta do CEP.');
          console.error(error);
        }
      );
    }
  }

  isButtonDisabled(): boolean {
    return this.cep.length === 0;
  }

  renderImages() {
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        let filterContainer = document.querySelector(".container-cep") as HTMLElement;
        filterContainer.style.backgroundImage = `url('assets/img/GIF-TENHA-FIBRA.gif-completo.gif')`;
      }
    }, 100);
  }


}
