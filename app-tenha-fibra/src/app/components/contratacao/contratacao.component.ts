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
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contratacao',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, HttpClientModule],
  providers: [ConsultaCepService, LeadsService, DatePipe],
  templateUrl: './contratacao.component.html',
  styleUrl: './contratacao.component.scss'
})
export class ContratacaoComponent implements OnInit {


  public currentStep = 0;
  public totalSteps = 3;
  public input?: string;
  public currentCep?: any;

  public formulario = new FormGroup({
    cep: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    uf: new FormControl('', [Validators.required])
  });

  public dadosPessoais = new FormGroup({
    nomeCompleto: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
    whatsapp: new FormControl(true, [Validators.required]),
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

    console.log('Formulario dados pessoais nome: ', this.dadosPessoais.get('nomeCompleto')?.value);
    console.log('Formulario dados pessoais cpf: ', this.dadosPessoais.get('cpf')?.value);
    console.log('Formulario dados pessoais telefone: ', this.dadosPessoais.get('telefone')?.value);
    console.log('Formulario dados pessoais whatsapp: ', this.dadosPessoais.get('whatsapp')?.value);

    console.log('Formulario endereço cep: ', this.formulario.get('cep')?.value);
    console.log('Formulario endereço endereco: ', this.formulario.get('endereco')?.value);
    console.log('Formulario endereço numero: ', this.formulario.get('numero')?.value);
    console.log('Formulario endereço bairro: ', this.formulario.get('bairro')?.value);
    console.log('Formulario endereço cidade: ', this.formulario.get('cidade')?.value);
    console.log('Formulario endereço uf: ', this.formulario.get('uf')?.value);

    console.log('Formulario plano planoInternet: ', this.plano.get('planoInternet')?.value);
    console.log('Formulario plano manhaCheckbox: ', this.plano.get('manhaCheckbox')?.value);
    console.log('Formulario plano tardeCheckbox: ', this.plano.get('tardeCheckbox')?.value);
    console.log('Data lead: ', this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')?.toString());
    
    const insert: any = {
      "nome_completo": this.dadosPessoais.get('nomeCompleto')?.value,
      "cpf": this.dadosPessoais.get('cpf')?.value,
      "telefone": this.dadosPessoais.get('telefone')?.value,
      "whatsapp": this.dadosPessoais.get('whatsapp')?.value,
      "cep": this.formulario.get('cep')?.value,
      "endereco": this.formulario.get('endereco')?.value,
      "numero": this.formulario.get('numero')?.value,
      "bairro": this.formulario.get('bairro')?.value,
      "complemento": 'falta implementar',
      "cidade": this.formulario.get('cidade')?.value,
      "uf": this.formulario.get('uf')?.value,
      "plano": this.plano.get('planoInternet')?.value,
      "turno_instalacao": this.plano.get('manhaCheckbox')?.value,
      "data_lead": new Date()
    }

    this.lead.insertLead(insert).subscribe(
      response => {
         console.log(response);
         Swal.fire({
          title: "Solicitação enviada com sucesso!",
          html: "Nós agradecemos a preferencia",
          confirmButtonText: "Fechar",
          icon: "success"
        }).then((result => {
          if(result.isConfirmed){
            this.modalRef.hide();
            this.router.navigate(['/home']);
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
        uf: this.currentCep.uf || ''
      });
    }
  }

}