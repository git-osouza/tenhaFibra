import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(private http: HttpClient) { }

  insertLead(lead: any): Observable<any> {
    return this.http.post<any>(environment.apiLead, lead);
  }

  getLeads(dataInicio: string, dataFim: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const payload = {
      dataInicio: dataInicio,
      dataFim: dataFim
    };

    return this.http.post<any>(environment.apiGetLeads, payload, { headers });
  }
}
