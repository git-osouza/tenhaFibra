import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Cep } from '../../models/cep.models';

@Injectable({
  providedIn: 'root',
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultarCEP(cepInput: string): Observable<Cep> {
    return this.http.get(`https://viacep.com.br/ws/${cepInput}/json/`);
  }
}
