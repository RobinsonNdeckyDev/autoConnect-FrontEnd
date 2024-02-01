import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListeUtilitairesService } from 'src/app/services/liste-utilitaires.service';

@Component({
  selector: 'app-utilitaires',
  templateUrl: './utilitaires.component.html',
  styleUrls: ['./utilitaires.component.css'],
})
export class UtilitairesComponent {
  annonces = true;
  listeUtilitaires: any[] = [];

  constructor(
    public listeUtilitaireService: ListeUtilitairesService,
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
    const categorieId = 2; // Remplacez par l'ID de la catégorie dont vous souhaitez récupérer les annonces
    this.listeUtilitaireService.getAnnonces(categorieId).subscribe(
      (annonces) => {
        console.log('annonces: ', annonces);
        this.listeUtilitaires = annonces;
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
