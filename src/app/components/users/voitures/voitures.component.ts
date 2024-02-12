import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeVoituresService } from 'src/app/services/liste-voitures.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css'],
})
export class VoituresComponent {
  listeVoitures: any;
  ListeAnnonces: any[] = [];
  voitureId?: number;
  voitureDetails: any;
  tabProprietaires: any[] = [];
  proprietaireInfo: any;
  voitureSelected: any;
  // Propriété pour stocker la valeur de recherche
  searchTermActive: string = '';
  listeVoituresSearch: any;

  constructor(
    private listeVoitureService: ListeVoituresService,
    private listeAnnonceService: PublierAnnonceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getAnnoncesValides();
  }

  // Liste des annonces mises en avant
  getAnnoncesValides() {
    let categorie = 1;

    this.listeAnnonceService.getAnnonceValideProp().subscribe(
      (response: any) => {
        console.log(response);
        // liste voitures
        this.ListeAnnonces = response.annonceValides;
        console.log('voitures: ', this.ListeAnnonces);

        this.listeVoitures = this.ListeAnnonces.filter(
          (element: any) => element.categorie_id === categorie
        );
        console.log('listeVoitures filtrées: ', this.listeVoitures);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Méthode pour filtrer les voitures en fonction de la recherche
  filtrerVoitureActives(event: any): void {
    // Obtenir la valeur de l'entrée utilisateur en minuscules
    const recherche = event.target.value.trim().toLowerCase();
    console.log(recherche);

    // Mettre à jour la propriété searchTermActive
    this.searchTermActive = recherche;

    // Si la recherche est vide, réinitialiser listeVoitures à la liste complète des voitures
    if (recherche === '') {
      this.listeVoitures = this.ListeAnnonces.filter(
        // Vous pouvez ajuster cette condition selon vos besoins
        (element: any) => element.categorie_id === 1
      );
    } else {
      // Sinon, filtrer les voitures en fonction de la recherche
      this.listeVoitures = this.ListeAnnonces.filter((voiture: any) =>
        voiture.nom.toLowerCase().includes(recherche)
      );
    }

    console.log('resultat recherche: ', this.listeVoitures);
  }

  
  // redirection vers la page details blog
  redirectToDetails(voitureId: number) {
    this.voitureSelected = voitureId;
    console.log(this.voitureSelected);
    this.route.navigate(['vehicules/voitures/detailVoiture', voitureId]);
  }
}
