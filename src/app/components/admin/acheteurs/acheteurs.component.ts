import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeUsersService } from 'src/app/services/liste-users.service';

@Component({
  selector: 'app-acheteurs',
  templateUrl: './acheteurs.component.html',
  styleUrls: ['./acheteurs.component.css'],
})
export class AcheteursComponent {
  acheteurs: any[] = [];
  filteredAcheteurs: any[] = [];
  searchTerm: string = '';

  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private listeUsers: ListeUsersService,
    private route: Router,
    http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAcheteurs();
  }

  getAcheteurs(): void {
    this.listeUsers.getAcheteurs().subscribe(
      (response: any) => {
        console.log(response.acheteur); // Affiche le tableau des propriétaires dans la console

        // Maintenant, vous pouvez accéder à l'array acheteur
        this.acheteurs = response.acheteur;

        // Initialisation de vos données d'acheteurs après réception des données
        this.filteredAcheteurs = this.acheteurs;
        console.log('acheteurs filtrer', this.filteredAcheteurs);
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des acheteurs : ",
          error
        );
      }
    );
  }

  // Voir detail d'un proprietaire
  voirDetails(acheteur: any): void {
    // Redirige vers le composant de détail avec l'ID du propriétaire
    this.route.navigate(['/admin/acheteurs', acheteur.id]);
  }

  // filtre
  filterAcheteurs() {
    this.filteredAcheteurs = this.acheteurs.filter(
      (acheteur) =>
        acheteur.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        acheteur.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        acheteur.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getAcheteurs();
  }
}
