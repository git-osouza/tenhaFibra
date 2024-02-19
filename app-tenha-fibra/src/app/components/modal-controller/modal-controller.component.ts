import { Component, OnInit } from '@angular/core';
import { ContratacaoComponent } from '../contratacao/contratacao.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CompartilhamentoDadosService } from '../../shared/services/dados/compartilhamento-dados.service';

@Component({
  selector: 'app-modal-controller',
  standalone: true,
  imports: [],
  providers: [BsModalService],
  templateUrl: './modal-controller.component.html',
  styleUrl: './modal-controller.component.scss'
})
export class ModalControllerComponent implements OnInit{

  constructor( private modalService: BsModalService, private dados: CompartilhamentoDadosService) {}

  public modalRef!: BsModalRef<ContratacaoComponent>;

  ngOnInit(): void {
    this.openModalComponent();
  }

  openModalComponent(){
    const initialState: Partial<ContratacaoComponent> = {
      input: 'input',
      currentCep: this.dados.getCep()
    };

    this.modalRef = this.modalService.show(ContratacaoComponent, {
      initialState,
      class: 'modal-lg'
    });
  }
}
