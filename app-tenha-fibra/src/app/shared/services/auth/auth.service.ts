import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}


  authenticate(email: string, senha: string): Observable<any> {
    const credentials = { email, senha };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(environment.apiAuth, credentials, { headers });
  }

}
