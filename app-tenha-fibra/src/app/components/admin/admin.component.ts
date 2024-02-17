import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeadsService } from '../../shared/services/lead/leads.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [LeadsService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  public dataInicio: string = '';
  public dataFim: string = '';

  constructor(private leadService:LeadsService) { }

  ngOnInit() {
  }

  chamarServico(dataInicio: string, dataFim: string): void {
    this.leadService.getLeads(dataInicio, dataFim).subscribe(
      response => {
        this.gerarExcel(response);
      },
      error => {
        console.error(error);
        Swal.fire({
          title: "Erro ao buscar os dados! <br> Tente novamente!",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: "Fechar",
          cancelButtonColor: '#6D01A4',
          icon: "error"
        });
      }
    );
  }

  onSubmit() {
    console.log('Data Início:', this.dataInicio);
    console.log('Data Fim:', this.dataFim);
    this.chamarServico(`${this.dataInicio} 00:00:00`, `${this.dataFim} 23:59:59`);
  }

  gerarExcel(leads: any[]): void {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(leads);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Leads');
      const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'leads.xlsx');
      Swal.fire({
        title: "Download executado com sucesso!",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Fechar",
        cancelButtonColor: '#6D01A4',
        icon: 'success'
      });
    } catch (error) {
      Swal.fire({
        title: "Erro ao extrair os dados! <br> Tente novamente!",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Fechar",
        cancelButtonColor: '#6D01A4',
        icon: "error"
      });
    }

  }



}
