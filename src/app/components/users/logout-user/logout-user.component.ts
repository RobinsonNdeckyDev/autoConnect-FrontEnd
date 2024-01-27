import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.css'],
})
export class LogoutUserComponent {
  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        console.log('Déconnexion réussie');
        // Rediriger ou effectuer d'autres actions après la déconnexion
        this.route.navigate(['/login']);
        this.alertMessage(
          'success',
          'réussie',
          'Vous vous etes déconnecté avec succés'
        );
      },
      (error) => {
        console.error('Erreur lors de la déconnexion :', error);
        this.alertMessage('error', 'Error', 'Erreur lors de la déconnexion');
      }
    );
  }

  // alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
