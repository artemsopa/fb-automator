import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app-injection-token';
import { Credential } from 'src/app/models/credentials';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) { }

  sendCredentials(credentials: Array<Credential>): Observable<Array<Credential>> {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Array<Credential>>(`${this.apiUrl}`, JSON.stringify(credentials), {headers:myHeaders}); 
  }
}
