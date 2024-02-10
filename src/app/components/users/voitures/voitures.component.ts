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
        console.log("listeVoitures filtrées: ", this.listeVoitures);

      },
      (error) => {
        console.log(error);
      }
    );
  }

  // redirection vers la page details blog
  redirectToDetails(voitureId: number) {
    this.voitureSelected = voitureId;
    console.log(this.voitureSelected);
    this.route.navigate(['vehicules/voitures/detailVoiture', voitureId]);
  }
}
