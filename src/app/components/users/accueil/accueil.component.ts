import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeBlogsService } from 'src/app/services/liste-blogs.service';
import { ListeContactsService } from 'src/app/services/liste-contacts.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  nomComplet: string = '';
  email: string = '';
  message: string = '';
  // liste des véhicules
  listemotos: any;
  listeVoitures: any;
  listeUtilitaires: any;

  // emailPattern
  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // attributs de tables
  blogs: any[] = [];

  constructor(
    private contactService: ListeContactsService,
    private listeAnnonceService: PublierAnnonceService,
    private listeBlogsService: ListeBlogsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    // Annonces en avant
    this.getAnnoncesEnAvant();

    // liste blogs
    this.getBlogs();
  }

  // Ajouter un contact
  addContact() {
    if (this.nomComplet == '') {
      this.alertMessage(
        'error',
        'Oops!',
        'Merci de renseigner votre nom complet!'
      );
    } else if (this.email == '') {
      this.alertMessage('error', 'Oops!', 'Merci de renseigner votre email!');
    } else if (this.message == '') {
      this.alertMessage('error', 'Oops!', 'Merci de renseigner votre message!');
    } else if (!this.email.match(this.emailPattern)) {
      this.alertMessage(
        'error',
        'Oops!',
        'Merci de renseigner une adresse mail valide!'
      );
    } else {
      let newAbonne = {
        nomComplet: this.nomComplet,
        email: this.email,
        message: this.message,
      };

      this.contactService.addMessage(newAbonne).subscribe((response: any) => {
        this.alertMessage('success', 'Super', 'Message envoyé avec succés');
        console.log(response);
        this.viderChamps();
      });
    }
  }

  // redirection vers la page details voiture
  redirectToDetailsVoiture(voitureId: number) {
    this.route.navigate(['vehicules/voitures/detailVoiture', voitureId]);
  }

  // redirection vers la page details moto
  redirectToDetailsMoto(motoId: number) {
    this.route.navigate(['vehicules/motos/detailMoto', motoId]);
  }

  // redirection vers la page details utilitaire
  redirectToDetailsUtilitaire(utilitaireId: number) {
    this.route.navigate([
      'vehicules/utilitaires/detailUtilitaire',
      utilitaireId,
    ]);
  }

  // Liste des annonces mises en avant
  getAnnoncesEnAvant() {
    this.listeAnnonceService.getAnnonceMisesEnAvant().subscribe(
      (response: any) => {
        console.log(response);
        // liste voitures
        this.listeVoitures = response.annoncesMisesEnAvant.voiture;
        console.log('voitures: ', this.listeVoitures);
        // liste motos
        this.listemotos = response.annoncesMisesEnAvant.moto;
        console.log('liste motos: ', this.listemotos);
        // liste motos
        this.listeUtilitaires = response.annoncesMisesEnAvant.utilitaire;
        console.log('liste utilitaire: ', this.listeUtilitaires);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Liste des blogs
  getBlogs() {
    this.listeBlogsService.getBlogs().subscribe(
      (response: any) => {
        console.log('liste des blogs ', response);

        // Assigner à blogs les trois premiers
        this.blogs = response.blocs.slice(0, 3);
        console.log('mon tableu de blogs ', this.blogs);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // redirection vers la page details blog
  redirectToDetails(blogId: number) {
    this.route.navigate(['/blog/detailsBlog', blogId]);
  }

  // vider champs
  viderChamps() {
    this.nomComplet = '';
    this.email = '';
    this.message = '';
  }

  // Alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
