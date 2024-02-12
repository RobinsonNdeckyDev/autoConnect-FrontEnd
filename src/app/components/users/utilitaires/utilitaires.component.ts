import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeUtilitairesService } from 'src/app/services/liste-utilitaires.service';
import { ListeVoituresService } from 'src/app/services/liste-voitures.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';

@Component({
  selector: 'app-utilitaires',
  templateUrl: './utilitaires.component.html',
  styleUrls: ['./utilitaires.component.css'],
})
export class UtilitairesComponent {
  listeUtilitaires: any;
  ListeAnnonces: any[] = [];
  utilitaireId?: number;
  utilitaireDetails: any;
  tabProprietaires: any[] = [];
  proprietaireInfo: any;
  utilitaireSelected: any;
  // Propriété pour stocker la valeur de recherche
  searchTermActive: string = '';

  constructor(
    private listeUtilitaireService: ListeUtilitairesService,
    private listeAnnonceService: PublierAnnonceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getAnnoncesValides();
  }

  // Liste des annonces mises en avant
  getAnnoncesValides() {
    let categorie = 3;

    this.listeAnnonceService.getAnnonceValideProp().subscribe(
      (response: any) => {
        console.log(response);
        // liste utilitaires
        this.ListeAnnonces = response.annonceValides;
        console.log('utilitaires: ', this.ListeAnnonces);

        this.listeUtilitaires = this.ListeAnnonces.filter(
          (element: any) => element.categorie_id === categorie
        );
        console.log('listeUtilitaires filtrées: ', this.listeUtilitaires);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Méthode pour filtrer les voitures en fonction de la recherche
  filtrerUtilitaireActives(event: any): void {
    const recherche = event.target.value.toLowerCase(); // Obtenir la valeur de l'entrée utilisateur
    console.log(recherche);
    // Mettre à jour la propriété searchTermActive
    this.searchTermActive = recherche;
    this.listeUtilitaires = this.ListeAnnonces.filter((voiture: any) =>
      voiture.nom.toLowerCase().includes(recherche)
    );
    console.log('resultat recherche: ', this.listeUtilitaires);
  }

  // redirection vers la page details blog
  redirectToDetails(utilitaireId: number) {
    this.utilitaireSelected = utilitaireId;
    console.log(this.utilitaireSelected);
    this.route.navigate([
      'vehicules/utilitaires/detailUtilitaire',
      utilitaireId,
    ]);
  }
}
