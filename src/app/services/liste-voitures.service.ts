import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListeVoituresService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Liste voitures
  getAnnonces(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annoncesParCategorie${id}`);
  }

  // Méthode pour récupérer les détails d'un blog
  getAnnonceDetails(annonceId: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.get<any>(`${this.apiUrl}/annonceShow${annonceId}`, {
      headers: headers,
    });
  }
}
