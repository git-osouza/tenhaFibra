import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CepFormatPipe } from '../../shared/pipes/cep-format.pipe';
import { ConsultaCepService } from './../../shared/services/cep/consulta-cep.service';
import { CompartilhamentoDadosService } from '../../shared/services/dados/compartilhamento-dados.service';


@Component({
  selector: 'app-consulta-cep',
  standalone: true,
  imports: [CepFormatPipe, FormsModule],
  providers: [ConsultaCepService],
  templateUrl: './consulta-cep.component.html',
  styleUrl: './consulta-cep.component.scss'
})
export class ConsultaCepComponent {

  constructor(private consultaCepService: ConsultaCepService, private router: Router, private dados: CompartilhamentoDadosService) { }

  public cep: string = '';

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
}
