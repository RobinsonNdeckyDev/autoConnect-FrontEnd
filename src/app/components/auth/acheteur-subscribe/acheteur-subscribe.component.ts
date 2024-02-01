import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Acheteur } from 'src/app/models/acheteur';
import { AuthenticationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-acheteur-subscribe',
  templateUrl: './acheteur-subscribe.component.html',
  styleUrls: ['./acheteur-subscribe.component.css'],
})
export class AcheteurSubscribeComponent {
  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}

  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  confirmation: string = '';
  telephone: string = '';
  adresse: string = '';
  role: string = 'acheteur';

  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

  inscriptionAcheteur() {
    if (this.validateformAcheteur()) {
      if (this.password !== this.confirmation) {
        this.alertMessage(
          'error',
          'Attention',
          'Les mots de passe ne correspondent pas!'
        );
        return;
      }

      this.registerUser();
    }
  }

  validateformAcheteur() {

    if (this.nom == '') {
      this.alertMessage('error', 'Attention', 'Merci de renseigner votre nom!');
      return false;
    } else if (this.prenom == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre prénom!'
      );
      return false;
    } else if (this.email == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre email!'
      );
      return false;
    } else if (!this.email.match(this.emailPattern)) {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner un email valide!'
      );
      return false;
    } else if (this.adresse == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre adresse!'
      );
      return false;
    } else if (this.password == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner le mot de passe!'
      );
      return false;
    } else if (this.password.length < 6) {
      this.alertMessage(
        'error',
        'Attention',
        'Le mot de passe doit être supérieur ou égal à 8 caractères!'
      );
      return false;
    } else if (this.confirmation == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de confirmer votre mot de passe!'
      );
      return false;
    } else if (this.confirmation !== this.password) {
      this.alertMessage(
        'error',
        'Attention',
        'Les mots de passe ne correspondent pas!'
      );
      return false;
    } else if (this.telephone == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre numéro de téléphone!'
      );
      return false;
    }

    return true;
    
  }

  registerUser() {
    // Créez une instance de Proprietaire avec les données d'inscription
    const nouveauAcheteur = new Acheteur(
      this.nom,
      this.prenom,
      this.email,
      this.password,
      this.confirmation,
      this.adresse,
      this.telephone,
      this.role
    );

    this.authService.registerAcheteur(nouveauAcheteur).subscribe(
      (response) => {
        console.log(response);

        this.route.navigate(['/login']);

        this.alertMessage(
          'success',
          'Bravo',
          'Vous vous êtes inscrit avec succès!'
        );
      },
      (error) => {
        console.error(error);
        this.alertMessage(
          'error',
          'Attention',
          'Inscription refusée. Veuillez réessayer.'
        );
      }
    );
  }

  cleanForm() {
    this.nom = '';
    this.email = '';
    this.prenom = '';
    this.password = '';
    this.confirmation = '';
    this.adresse = '';
    this.telephone = '';
  }

  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}