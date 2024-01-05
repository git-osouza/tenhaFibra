import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CepFormatPipe } from '../../shared/pipes/cep-format.pipe';
import { ConsultaCepService } from './../../shared/services/cep/consulta-cep.service';
import { Cep } from '../../shared/models/cep.models';


@Component({
  selector: 'app-consulta-cep',
  standalone: true,
  imports: [CepFormatPipe, FormsModule],
  providers:[ConsultaCepService],
  templateUrl: './consulta-cep.component.html',
  styleUrl: './consulta-cep.component.scss'
})
export class ConsultaCepComponent {

  @Output() currentCep = new EventEmitter<Cep>();


  constructor(private consultaCepService: ConsultaCepService) {}
  cep: string = '';

  consultarCep(){
    if(this.cep){
      this.consultaCepService.consultarCEP(this.cep).subscribe(
        (data: any) => {
          if (!data.erro) {
            console.log(data);
            this.currentCep.emit(data);
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

  isButtonDisabled():boolean {
    return this.cep.length === 0;
  }
}
