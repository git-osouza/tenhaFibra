import { AuthService } from './../../shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule, AdminComponent],
  providers: [AuthService, NgxSpinnerService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent{

  public email!: string;
  public senha!: string;
  public permiteAcesso!: boolean;


  constructor(private auth: AuthService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) { }

  submitForm(): void {
    this.spinner.show();
    setTimeout(() => {
      this.auth.authenticate(this.email, this.senha).subscribe(
        response => {
          this.spinner.hide();
          this.permiteAcesso = true;
          this.cdr.detectChanges();
        },
        error => {
          this.spinner.hide();
          Swal.fire({
            title: "Usuário ou senha inválidos! <br> Tente novamente!",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: "Fechar",
            cancelButtonColor: '#6D01A4',
            icon: "error"
          });
        }
      );
    }, 2000);
  }

  isButtonDisabled(): boolean {
    return !this.email || !this.senha;
  }
}
