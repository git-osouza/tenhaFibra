import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaOfertasService {

  constructor(private http: HttpClient) { }

  consultarOfertas(cepInput: string): Observable<any> {
    const postData = { cep: cepInput };
    return this.http.post(environment.apiVitrini, postData);
  }
}
