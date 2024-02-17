import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}

  login(): void {
    console.log(this.email);
    console.log(this.password);

    if (this.email == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre email'
      );
    } else if (!this.email.match(this.emailPattern)) {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner un email valide'
      );
    } else {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          console.log(response);

          // Si la connexion réussit, stocker la réponse dans le local storage, y compris le token
          localStorage.setItem('token', response.access_token); // Stocker le token

          const userdata = localStorage.getItem('currentUser');

          const userConnectedRole = userdata ? JSON.parse(userdata).role : null;
          console.log(userConnectedRole);

          // Rediriger l'utilisateur vers une autre page

          switch (response.user.role) {
            case 'admin':
              this.route.navigate(['/admin']);
              this.alertMessage(
                'success',
                'Super',
                'Connexion réussie avec succés.'
              );
              break;
            case 'proprietaire':
              this.route.navigate(['/proprietaire']);
              this.alertMessage(
                'success',
                'Super',
                'Connexion réussie avec succés.'
              );
              break;
            case 'acheteur':
              this.route.navigate(['/accueil']);
              this.alertMessage(
                'success',
                'Super',
                'Connexion réussie avec succés.'
              );
              break;
            default:
              // Redirection par défaut si le rôle n'est pas reconnu
              this.route.navigate(['/accueil']);
          }
        },
        (error) => {
          // En cas d'erreur, afficher un message d'erreur
          this.alertMessage(
            'error',
            'Erreur',
            'Connexion échouée. Veuillez vérifier vos identifiants.'
          );
        }
      );
    }
  }

  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: 2000, // Durée en millisecondes avant la disparition
      timerProgressBar: true, // Barre de progression de la temporisation
      showConfirmButton: false, // Cacher le bouton de confirmation
    });
  }
}
