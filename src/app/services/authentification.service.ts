// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Token } from '@angular/compiler';



@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth'; // URL de votre API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          // Stocker les informations utilisateur et le token dans le stockage local
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.access_token);
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  register(
    nom: string, 
    email: string, 
    password: string,
    passwordConfirm: string,
    prenom: string,
    telephone: string,
    photoProfile: string,
    adresse: string,
    description: string,
    role: string

    ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      nom,
      email,
      password,
      passwordConfirm,
      prenom,
      telephone,
      photoProfile,
      adresse,
      description,
      role
    });
  }

  logout(): Observable<any> {
    // Supprimer le token du stockage local
    localStorage.removeItem('token');

    // Ajoutez d'autres actions de déconnexion si nécessaire
    return this.http.post<any>(`${this.apiUrl}/logout`, {}).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}





































// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthenticationService {
//   private apiUrl = 'http://127.0.0.1:8000/api/auth';

//   constructor(private http: HttpClient, private router: Router) {}

//   login(credentials: { email: string; password: string }): Observable<any> {
//     console.log(
//       'Tentative de connexion avec les identifiants suivants :',
//       credentials
//     );

//     return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
//       tap((response) => {
//         console.log('Réponse du serveur après connexion réussie :', response);
//         localStorage.setItem('token', response.token);
//       }),
//       catchError((error) => {
//         console.error('Erreur lors de la connexion :', error);
//         return throwError(error);
//       })
//     );
//   }

//   logout(): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/logout`, {}).pipe(
//       tap(() => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('token_expiry');
//         this.router.navigate(['/login']);
//       }),
//       catchError((error) => {
//         console.error('Erreur lors de la déconnexion :', error);
//         return throwError(error);
//       })
//     );
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   isTokenExpired(): boolean {
//     const expiry = localStorage.getItem('token_expiry');
//     if (!expiry) {
//       return true;
//     }
//     return new Date(expiry) <= new Date();
//   }

//   refreshToken(): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/refresh`, {}).pipe(
//       tap((response) => {
//         localStorage.setItem('token', response.token);
//         // Mettre à jour la date d'expiration si elle est renvoyée par le serveur
//         if (response.expires_at) {
//           localStorage.setItem('token_expiry', response.expires_at);
//         }
//       }),
//       catchError((error) => {
//         console.error('Erreur lors du rafraîchissement du token :', error);
//         this.logout(); // Déconnectez l'utilisateur en cas d'échec du rafraîchissement
//         return throwError(error);
//       })
//     );
//   }
// }
