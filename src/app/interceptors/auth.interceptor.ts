// auth-interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthenticationService } from '../services/authentification.service';
// import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Ajouter le token à l'en-tête d'autorisation si l'utilisateur est connecté
    const authToken = this.authService.getToken();
    
    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}





































// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthenticationService } from '../services/authentification.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthenticationService) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (this.authService.isTokenExpired()) {
//       // Token expiré, déconnexion automatique de l'utilisateur
//       this.authService.logout();
//       return throwError('Token expiré');
//     }

//     const token = this.authService.getToken();
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     }
//     return next.handle(request).pipe(
//       catchError((error) => {
//         // Gérer les erreurs HTTP
//         return throwError(error);
//       })
//     );
//   }
// }
