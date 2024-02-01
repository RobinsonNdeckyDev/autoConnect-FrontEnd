import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilProprietaireService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les détails du proprietaire
  getProprietaireDetails(proprietaireId: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.get<any>(
      `${this.apiUrl}/acheteurUpdate${proprietaireId}`,
      {
        headers: headers,
      }
    );
  }

  // Méthode pour modifier un proprietaire
  modifierProprietaire(proprietaireId: number, newData: any): Observable<any> {
    const url = `${this.apiUrl}/acheteurUpdate${proprietaireId}`; // Utilisation de l'ID fourni dans l'URL
    return this.http.patch(url, newData);
  }
}
