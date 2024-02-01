import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListeVoituresService } from 'src/app/services/liste-voitures.service';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css'],
})
export class VoituresComponent {
  annonces = true;
  listeVoitures: any[] = [];
  listeVoituresActives: any[] = [];
  annoncesVoituresFiltrees: any[] = [];

  constructor(
    public listeVoitureService: ListeVoituresService,
    private http: HttpClient
  ) {}

  afficherAnnonces() {
    this.annonces = !this.annonces;
  }

  ngOnInit(): void {
    this.listesAnnonces();
  }

  // Liste des voitures
  listesAnnonces(): void {
    // Remplacez par l'ID de la catégorie dont vous souhaitez récupérer les annonces
    const categorieId = 1;
    const etat = 'refuser';

    this.listeVoitureService.getAnnonces(categorieId).subscribe(
      (response: any) => {
        console.log(response.annonces);
        this.listeVoitures = response.annonces;

        this.annoncesVoituresFiltrees = this.listeVoitures.filter(
          (annonceVoiture) => annonceVoiture.etat === etat
        );
        console.log('Annonces filtrées : ', this.annoncesVoituresFiltrees);
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des annonces : ",
          error
        );
      }
    );
  }
}
