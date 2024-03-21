import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faUser, faWifi } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConsultaCepService } from '../../shared/services/cep/consulta-cep.service';
import { CompartilhamentoDadosService } from '../../shared/services/dados/compartilhamento-dados.service';
import { HttpClientModule } from '@angular/common/http';
import { LeadsService } from '../../shared/services/lead/leads.service';
import { CommonModule, DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contratacao',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [ConsultaCepService, LeadsService, DatePipe],
  templateUrl: './contratacao.component.html',
  styleUrl: './contratacao.component.scss'
})
export class ContratacaoComponent implements OnInit {


  public currentStep = 0;
  public totalSteps = 3;
  public input?: string;
  public currentCep?: any;
  public item?: any;

  public formulario = new FormGroup({
    cep: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    uf: new FormControl('', [Validators.required]),
    complemento: new FormControl('', [Validators.required])
  });

  public dadosPessoais = new FormGroup({
    nomeCompleto: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
    whatsapp: new FormControl(true, [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  public plano = new FormGroup({
    planoInternet: new FormControl('', [Validators.required]),
    manhaCheckbox: new FormControl('', [Validators.required]),
    tardeCheckbox: new FormControl('', [Validators.required]),
  });

  constructor(
    library: FaIconLibrary,
    private modalRef: BsModalRef,
    private el: ElementRef,
    private renderer: Renderer2,
    private consultaCepService: ConsultaCepService,
    private dados: CompartilhamentoDadosService,
    private lead: LeadsService,
    private datePipe: DatePipe,
    private router: Router) {

    library.addIcons(faUser, faMapMarkerAlt, faWifi, faWhatsapp);
  }

  ngOnInit(): void {
    this.updateSteps();
    this.inicializarFormEndereco();

  }
  fecharModal() {
    this.modalRef.hide();
  }

  saveDataGet() {

    const insert: any = {
      "nome_completo": this.dadosPessoais.get('nomeCompleto')?.value,
      "cpf": this.dadosPessoais.get('cpf')?.value,
      "telefone": this.dadosPessoais.get('telefone')?.value,
      "whatsapp": this.dadosPessoais.get('whatsapp')?.value,
      "email": this.dadosPessoais.get('email')?.value,
      "cep": this.formulario.get('cep')?.value,
      "endereco": this.formulario.get('endereco')?.value,
      "numero": this.formulario.get('numero')?.value,
      "bairro": this.formulario.get('bairro')?.value,
      "complemento": this.formulario.get('complemento')?.value,
      "cidade": this.formulario.get('cidade')?.value,
      "uf": this.formulario.get('uf')?.value,
      "plano": `${this.item.nome} - R$ ${this.item.valores_plano.valor_oferta}`,
      "turno_instalacao": this.setTurnoInstalacao(
        this.plano.get('manhaCheckbox')?.value as string | undefined,
        this.plano.get('tardeCheckbox')?.value as string | undefined
      ),

      "data_lead": new Date()
    }

    this.lead.insertLead(insert).subscribe(
      response => {
         console.log(response);
         Swal.fire({
          title: "Solicitação enviada com sucesso!",
          html: "Nós agradecemos a preferência",
          confirmButtonText: "Fechar",
          icon: "success"
        }).then((result => {
          if(result.isConfirmed){
            this.modalRef.hide();
          }
        }));
      },
      error => {
        console.error(error);
        Swal.fire({
          title: "Ocorreu algum erro!",
          confirmButtonText: "Fechar",
          icon: "error"
        }).then((result => {
          if(result.isConfirmed){
            this.modalRef.hide();
          }
        }));
      }
    );

  }

  cancelar() {
    console.log('cancelou');
    this.modalRef.hide();
  }

  voltar() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateSteps();
    }
  }

  avancar(): void {
    this.currentStep++;
    this.updateSteps();
  }

  private updateSteps(): void {
    for (let i = 0; i < this.totalSteps; i++) {
      const stepContent = this.el.nativeElement.querySelector(`#step${i}`);

      if (stepContent) {
        if (i === this.currentStep) {
          this.renderer.addClass(stepContent, 'active');
        } else {
          this.renderer.removeClass(stepContent, 'active');
        }
      }
    }
  }

  consultarCEP() {
    const cepDigitado = this.formulario.get('cep')?.value;
    if (cepDigitado) {
      this.consultaCepService.consultarCEP(cepDigitado).subscribe(
        (data: any) => {
          if (!data.erro) {
            this.dados.setCep(data);
            this.currentCep = data;
            this.inicializarFormEndereco();
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

  inicializarFormEndereco() {
    if (this.currentCep) {
      this.formulario.patchValue({
        cep: this.currentCep.cep || '',
        endereco: this.currentCep.logradouro || '',
        numero: '',
        bairro: this.currentCep.bairro || '',
        cidade: this.currentCep.localidade || '',
        uf: this.currentCep.uf || '',
        complemento: this.currentCep.complemento || ''
      });
    }
  }

  setTurnoInstalacao(manha: string | undefined, tarde: string | undefined): string {
    if (manha !== undefined && tarde !== undefined) {
        if (manha && tarde) {
            return 'Manhã ou Tarde';
        }

        if (manha && !tarde) {
            return 'Manhã';
        }

        if (tarde && !manha) {
            return 'Tarde';
        }
    }
    return 'Há confirmar';
  }


}
