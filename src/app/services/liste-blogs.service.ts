import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  // Supprimer un blog
  deleteBlog(blogId: number): Observable<void> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete<void>(`${this.apiUrl}/blocDestroy/${blogId}`, {
      headers,
    });
  }

  // Ajout blog
  addblog(newMessage: any): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post<any[]>(`${this.apiUrl}/blocStore`, newMessage, {
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

  // modification blog
  // Méthode pour modifier un blog
  modifierBlog(blog: any): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this.http.patch<any>(`${this.apiUrl}/blocUpdate/${blog.id}`, blog, {
      headers: headers,
    });
  }

  // modifierBlog(blog: any): Observable<any> {
  //   let headers = new HttpHeaders();
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     headers = headers.set('Authorization', 'Bearer ' + token);
  //   }

  //   return this.http.patch<any>(`${this.apiUrl}/blocUpdate/${blog.id}`, blog, {
  //     headers: headers,
  //   });
  // }
}
