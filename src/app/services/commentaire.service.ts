import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Liste commentaires
  getcommentaires(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiUrl}/commentaires`);
  }

  // Commentaires sur une annonce pour admin
  deleteCommentAnnonceAdmin(id: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<any>(`${this.apiUrl}/commentaireDestroy${id}`, {
      headers: headers,
    });
  }

  // Commentaires sur une annonce pour admin
  getCommentAnnnonceAdmin(id: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any>(`${this.apiUrl}/annonceShowAdmin${id}`, {
      headers: headers,
    });
  }

  // Commentaires sur une annonce pour admin
  getCommentAnnnonceProprietaire(id: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any>(`${this.apiUrl}/annonceShow${id}`, {
      headers: headers,
    });
  }

  // Signaler annonce
  commentAnnonce(annonceComment: any, idAnnonce: number) {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(
      `${this.apiUrl}/commentaireStore${annonceComment}`,
      idAnnonce,
      {
        headers: headers,
      }
    );
  }
}
