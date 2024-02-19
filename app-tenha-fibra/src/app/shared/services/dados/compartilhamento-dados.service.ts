import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartilhamentoDadosService {

  public cep: any;
  public ofertasLits?: any[];

  constructor() { }

  setCep(cep: any){
    this.cep = cep;
  }

  getCep(): any{
    return this.cep;
  }

  setOfertas(ofertas: any[]){
    this.ofertasLits?.push(ofertas);
  }

  getOfertas(): any{
    if(this.ofertasLits?.length){
      return this.ofertasLits;
    }
  }
}
