import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proprietaire } from 'src/app/models/proprietaire';
import { AuthenticationService } from 'src/app/services/authentification.service';
// import { InscriptionService } from 'src/app/services/inscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendeur-subscribe',
  templateUrl: './vendeur-subscribe.component.html',
  styleUrls: ['./vendeur-subscribe.component.css'],
})
export class VendeurSubscribeComponent {
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
  description: string = '';
  image!: File;
  role: string = 'proprietaire';

  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

  inscription() {
    if (this.validateForm()) {
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

  validateForm() {
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
    } else if (this.description == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre description!'
      );
      return false;
    }
    return true;
  }

  registerUser() {
    
    let formData = new FormData();
    formData.append('nom', this.nom);
    formData.append('prenom', this.prenom);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('confirmation', this.confirmation);
    formData.append('telephone', this.telephone);
    formData.append('adresse', this.adresse);
    formData.append('description', this.description);
    formData.append('role', this.role);
    // Ajouter l'image
    formData.append('image', this.image);

    
    this.authService.registerproprietaire(formData).subscribe(
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
    this.description = '';
    // this.image = '';
  }

  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  // File img1
  profilAdd(event: any) {
    this.image = event.target.files[0] as File;
    console.warn(event.target.files[0]);
  }
}
