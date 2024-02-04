import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublierAnnonceService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API

  constructor(private http: HttpClient) {}

  //Ajout annonce
  addAnnonce(newAnnonce: any): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(`${this.apiUrl}/annonceStore`, newAnnonce, {
      headers: headers,
    });
  }

  // Mettre à jour une annonce
  updateAnnonceState(annonceId: number, newState: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.patch(`${this.apiUrl}/updateEtataAnnonce${annonceId}`, {
      etat: newState,
    });
  }

  // Annonces proprietaire valides
  getAnnonceValideProp(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annonceValides`);
  }

  // Annonces proprietaire invalides
  getAnnonceInvalideProp(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annonceInvalides`);
  }
}
