import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListeUtilitairesService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Liste utilitaires
  getAnnonces(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annoncesParCategorie${id}`);
  }

  // supprimer une annonce
  deleteAnnonce(annonceId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.delete<any>(
      `${this.apiUrl}/annonceDestroyAdmin${annonceId}`,
      {
        headers: headers,
      }
    );
  }

  // Méthode pour avoir les donnees sur un utilitaire
  infoUtilitaire(idUtilitaire: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.get<any>(`${this.apiUrl}/annonceDetail${idUtilitaire}`, {
      headers: headers,
    });
  }
}
