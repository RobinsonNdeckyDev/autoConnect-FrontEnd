import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListeCategoriesService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  // Ajout blog
  addCategorie(newCategorie: any): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(
      `${this.apiUrl}/categorieStore`,
      newCategorie,
      {
        headers: headers,
      }
    );
  }

  
  // Méthode pour modifier un blog
  modifierCategorie(id: number, newData: any): Observable<any> {
    const url = `${this.apiUrl}/categorieUpdate${id}`; // Utilisation de l'ID fourni dans l'URL
    return this.http.patch(url, newData);
  }

  // Supprimer un blog
  deleteCategorie(categorieId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<any>(
      `${this.apiUrl}/cateegorieDestroy${categorieId}`,
      {
        headers: headers,
      }
    );
  }
}
