// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Proprietaire } from '../models/proprietaire';
import { Acheteur } from '../models/acheteur';
import { JwtPayload } from 'jwt-decode';
declare function jwt_decode<T extends JwtPayload = JwtPayload>( token: string ): T;


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API

  constructor(private http: HttpClient) {}

  // connexion
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, { email, password })
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

  // Inscription
  registerproprietaire(proprietaire: Proprietaire): Observable<any> {
    console.log("Données d'inscription :", proprietaire);

    return this.http.post<any>(`${this.apiUrl}/register`, proprietaire).pipe(
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
  registerAcheteur(acheteur: Acheteur): Observable<any> {
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
        // Supprimer le token du stockage local
        localStorage.removeItem('token');

        // Vider complètement le localStorage
        localStorage.clear();
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








