import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeUsersService } from 'src/app/services/liste-users.service';


@Component({
  selector: 'app-vendeurs',
  templateUrl: './vendeurs.component.html',
  styleUrls: ['./vendeurs.component.css'],
})
export class VendeursComponent {
  proprietaires: any[] = [];
  proprietairesFiltres: any[] = [];
  recherche: string = '';

  constructor(
    private listeUsers: ListeUsersService,
    private route: Router,
    http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getproprietaires();
  }

  getproprietaires(): void {
    this.listeUsers.getProprietaires().subscribe(
      (response: any) => {
        console.log(response.proprietaire); // Affiche le tableau des propriétaires dans la console

        // Maintenant, vous pouvez accéder à l'array proprietaire
        this.proprietaires = response.proprietaire;

        // Initialisation de vos données d'acheteurs après réception des données
        this.proprietairesFiltres = this.proprietaires;
        console.log('proprietaires filtrer', this.proprietairesFiltres);
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des proprietaires : ",
          error
        );
      }
    );
  }

  // Voir detail d'un proprietaire
  voirDetails(proprietaire: any): void {
    // Redirige vers le composant de détail avec l'ID du propriétaire
    this.route.navigate(['/admin/proprietaires', proprietaire.id]);
  }

  // filtre
  filtrerProprietaires() {
    this.proprietairesFiltres = this.proprietaires.filter((proprietaire) => {
      return (
        proprietaire.nom.toLowerCase().includes(this.recherche.toLowerCase()) ||
        proprietaire.prenom
          .toLowerCase()
          .includes(this.recherche.toLowerCase()) ||
        proprietaire.email
          .toLowerCase()
          .includes(this.recherche.toLowerCase()) ||
        proprietaire.telephone
          .toLowerCase()
          .includes(this.recherche.toLowerCase()) ||
        proprietaire.adresse
          .toLowerCase()
          .includes(this.recherche.toLowerCase())
      );
    });
  }
}
