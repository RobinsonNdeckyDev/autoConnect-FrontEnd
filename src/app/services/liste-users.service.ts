import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListeUsersService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getProprietaires(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiUrl}/listeProprietaire`);
  }

  getAcheteurs(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiUrl}/listeAcheteur`);
  }

  // recuperer le whatsapp

  getWhatsapp(idUser: number): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.post<any[]>(`${this.apiUrl}/whatsap${idUser}`, {});
  }

  // UsershowId
  // Supprimer un user
  userShowDetail(userId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any>(`${this.apiUrl}/proprietaireShow${userId}`, {
      headers: headers,
    });
  }

  // Supprimer un user
  // userUpdateDetail(userId: number, proprietaireData: any): Observable<any> {
  //   let headers = new HttpHeaders();
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     headers = headers.set('Authorization', 'Bearer ' + token);
  //   }
  //   return this.http.patch<any>(`${this.apiUrl}/proprietaireUpdate${userId}`, {
  //     proprietaireData,
  //   });
  // }

  // Modifier le profil du proprietaire
  userUpdateDetail(id: number, proprietaireData: any): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    // Utilisation de l'ID fourni dans l'URL
    const url = `${this.apiUrl}/proprietaireUpdate${id}`;
    return this.http.patch(url, proprietaireData);
  }

  // Supprimer un user
  deleteUser(userId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<any>(`${this.apiUrl}/userDestroy${userId}`, {
      headers: headers,
    });
  }

  // detail d'un user
}
