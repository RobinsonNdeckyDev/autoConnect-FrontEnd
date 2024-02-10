import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css'],
})
export class VehiculesComponent {
  // liste des véhicules
  listemotos: any;
  listeVoitures: any;
  listeUtilitaires: any;

  // constructeur
  constructor(
    private listeAnnonceService: PublierAnnonceService,
    private route: Router
  ) {}

  // initialisation
  ngOnInit(): void {
    // annonces en avant
    this.getAnnoncesEnAvant();
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
    this.route.navigate(['vehicules/utilitaires/detailUtilitaire', utilitaireId]);
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
}
