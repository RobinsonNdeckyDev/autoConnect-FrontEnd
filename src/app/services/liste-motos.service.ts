import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListeMotosService {

  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Liste voitures
  getAnnonces(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annoncesParCategorie${id}`);
  }
  
}
