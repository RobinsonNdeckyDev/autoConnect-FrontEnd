// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Proprietaire } from '../models/proprietaire';
import { Acheteur } from '../models/acheteur';
import { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
declare function jwt_decode<T extends JwtPayload = JwtPayload>( token: string ): T;


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // URL de mon API
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenExpirationTimer: any;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private http: HttpClient, private router: Router) {}

  // connexion
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((response) => {
          // Stocker les informations utilisateur et le token dans le stockage local
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.access_token);
          // Démarrer le minuteur de rafraîchissement du jeton
          this.startTokenRefreshTimer();
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  // Démarrer le minuteur pour rafraîchir le jeton avant son expiration
  private startTokenRefreshTimer() {
    const token = localStorage.getItem('token');
    if (!token) {
      return; // Pas de jeton trouvé, ne rien faire
    }

    const tokenExpiration: Date | null = this.getTokenExpiration(token); // Obtenir la date d'expiration du jeton
    const now = new Date(); // Date actuelle
    const expiresIn = tokenExpiration
      ? tokenExpiration.getTime() - now.getTime()
      : 0; // Calculer le temps restant avant l'expiration

    // Convertir le temps en minutes
    const expiresInMinutes = expiresIn / 60000; // 1 minute = 60000 millisecondes

    console.log(
      `Le jeton expire dans environ ${expiresInMinutes.toFixed(2)} minutes.`
    );

    // Rafraîchir le jeton 5 minutes avant son expiration
    const refreshTime = expiresIn - 5 * 60 * 1000;

    // console.log(`Token expires in ${expiresIn / 1000} seconds`);

    console.log('Token refresh timer started'); // Déclaration de console pour indiquer que le minuteur de rafraîchissement du jeton a démarré

    setTimeout(() => {
      this.refreshToken(); // Appeler la méthode de rafraîchissement du jeton
    }, refreshTime);
  }

  // Obtenir la date d'expiration du jeton à partir du jeton JWT
  private getTokenExpiration(token: string): Date | null {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Décoder le jeton JWT
    if (decoded && decoded.exp) {
      return new Date(decoded.exp * 1000); // Retourner la date d'expiration si elle est présente dans le jeton
    }
    return null; // Retourner null si la date d'expiration n'est pas trouvée
  }

  // Méthode pour rafraîchir le jeton
  private refreshToken() {
    console.log('Refreshing token...'); // Déclaration de console pour indiquer que le rafraîchissement du jeton est en cours
    if (this.refreshTokenInProgress) {
      // S'il y a déjà un rafraîchissement en cours, attendre qu'il soit terminé avant de réessayer
      return this.refreshTokenSubject.pipe(
        switchMap(() => {
          return this.http.post<any>(`${this.apiUrl}/auth/refresh`, {}).pipe(
            map((response) => {
              localStorage.setItem('token', response.access_token); // Mettre à jour le jeton dans le stockage local
              console.log('Token refreshed successfully'); // Déclaration de console pour indiquer que le rafraîchissement du jeton a réussi
              return response;
            }),
            catchError((error) => {
              this.logout(); // Déconnecter l'utilisateur en cas d'échec du rafraîchissement du jeton
              return throwError(error);
            }),
            finalize(() => {
              this.refreshTokenInProgress = false;
              this.refreshTokenSubject.next(null);
            })
          );
        })
      );
    } else {
      // Marquer le rafraîchissement du jeton en cours
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);

      return this.http.post<any>(`${this.apiUrl}/auth/refresh`, {}).pipe(
        map((response) => {
          localStorage.setItem('token', response.access_token); // Mettre à jour le jeton dans le stockage local
          console.log('Token refreshed successfully'); // Déclaration de console pour indiquer que le rafraîchissement du jeton a réussi
          return response;
        }),
        catchError((error) => {
          this.logout(); // Déconnecter l'utilisateur en cas d'échec du rafraîchissement du jeton
          return throwError(error);
        }),
        finalize(() => {
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(null);
        })
      );
    }
  }

  

  // Inscription

  registerproprietaire(formData: FormData): Observable<any> {
    console.log("Données d'inscription :", formData);

    return this.http.post<any>(`${this.apiUrl}/register`, formData).pipe(
      tap((response) => {
        console.log("Réponse de l'API après inscription :", response);
      }),
      catchError((error) => {
        console.error("Erreur lors de l'inscription :", error);
        throw error;
      })
    );
  }

  // vendeur
  registerAcheteur(acheteur: any): Observable<any> {
    console.log("Données d'inscription :", acheteur);

    return this.http.post<any>(`${this.apiUrl}/register`, acheteur).pipe(
      tap((response) => {
        console.log("Réponse de l'API après inscription :", response);
      }),
      catchError((error) => {
        console.error("Erreur lors de l'inscription :", error);
        throw error;
      })
    );
  }

  // Déconnexion
  logout(): Observable<any> {
    // Récupérer le token du stockage local
    var token = localStorage.getItem('token');
    console.log(token); // Utilisez la variable token ici

    // Assurez-vous que token n'est pas null ou undefined avant de l'utiliser
    if (!token) {
      console.error('Token non trouvé dans le stockage local');
      return throwError('Token non trouvé');
    }

    // Assurez-vous que l'URL est correcte
    const logoutUrl = `${this.apiUrl}/auth/logout`;

    // Effectuez la requête HTTP POST pour se déconnecter
    return this.http.post<any>(logoutUrl, {}).pipe(
      tap(() => {
        clearTimeout(this.tokenExpirationTimer);
        // Supprimer le token du stockage local
        localStorage.removeItem('token');

        // Vider complètement le localStorage
        localStorage.clear();

        // Redirection vers la page de connexion
        // this.router.navigate(['/login']);
      }),

      catchError((error) => {
        throw error;
      })
    );
  }

  // récupération du token

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Is connected pour vérifier s'il est toujours connecté
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Récupérer les informations du vendeur depuis l'API
  getvendeurDetails(id: number): Observable<any> {
    const token = this.getToken();

    if (!token) {
      return throwError('Token non trouvé');
    }

    return this.http
      .get<any>(`${this.apiUrl}/acheteurShow/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  // Mettre à jour les informations de l'vendeur
  updatevendeurDetails(id: number, vendeurData: any): Observable<any> {
    const token = this.getToken();

    if (!token) {
      return throwError('Token non trouvé');
    }

    return this.http
      .patch<any>(`${this.apiUrl}/acheteurUpdate/${id}`, vendeurData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  // Méthode fictive pour récupérer l'ID de l'utilisateur connecté
  getLoggedInUserId(): number | null {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwt_decode(token); // Utiliser any pour le résultat décodé
      return decodedToken.userId;
    } else {
      return null;
    }
  }
}








