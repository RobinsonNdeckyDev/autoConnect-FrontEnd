import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private inscriptionUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  register(vendeur: 
    { email: string; 
      password: string;
      passwordConfirm: string;
      nom: string;
      prenom: string;
      photoProfile: string;
      adresse: string;
      telephone: string;
      description: string;
    }
  ): Observable<any> {
    return this.http.post<any>(`${this.inscriptionUrl}/register`, vendeur);
  }


}
