import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../models/annonce';

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

  // Mettre à jour l'etat d'une annonce
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

 
  // Modification d'une annonce
  updateAnnonceOnly(id: number, annonceAjour:any): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    // Utilisation de l'ID fourni dans l'URL
    const url = `${this.apiUrl}/annonceUpdate${id}`;
    return this.http.patch(url, annonceAjour);
  }

  // Annonces proprietaire valides
  getAnnonceValideProp(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annonceValides`);
  }

  // Annonces proprietaire invalides
  getAnnonceInvalideProp(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annonceInvalides`);
  }

  // Annonces Mises en avant
  getAnnonceMisesEnAvant(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/annoncesMisesEnAvantParCategorie`
    );
  }

  // Annonces Userproprietaire valides
  getAnnonceUserValide(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annonceUserValides`);
  }

  // Annonces Userproprietaire invalides
  getAnnonceUserInvalide(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annonceUserInvalides`);
  }
}
