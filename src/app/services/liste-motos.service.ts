import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListeMotosService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Liste motos
  getAnnonces(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annoncesParCategorie${id}`);
  }

  // Méthode pour avoir les donnees sur une moto
  infoMoto(idMoto: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.get<any>(`${this.apiUrl}/annonceDetail${idMoto}`, {
      headers: headers,
    });
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
}
