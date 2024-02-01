import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root',
})
export class ListeBlogsService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Liste blogs
  getBlogs(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<any[]>(`${this.apiUrl}/blocs`);
  }

  // Ajout blog
  addblog(newBlog: any): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(`${this.apiUrl}/blocStore`, newBlog, {
      headers: headers,
    });
  }

  // Méthode pour récupérer les détails d'un blog
  getBlogDetails(blogId: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.get<any>(`${this.apiUrl}/blocStore/${blogId}`, {
      headers: headers,
    });
  }

  // Méthode pour modifier un blog
  modifierBlog(id: number, newData: Categorie): Observable<any> {
    const url = `${this.apiUrl}/categorieUpdate${id}`; // Utilisation de l'ID fourni dans l'URL
    return this.http.patch(url, newData);
  }

  // Supprimer un blog
  deleteBlog(blogId: number): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<any>(`${this.apiUrl}/blocDestroy${blogId}`, {
      headers: headers,
    });
  }
}
