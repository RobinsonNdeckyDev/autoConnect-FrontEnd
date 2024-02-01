import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListeMotosService } from 'src/app/services/liste-motos.service';

@Component({
  selector: 'app-motos',
  templateUrl: './motos.component.html',
  styleUrls: ['./motos.component.css'],
})
export class MotosComponent {
  annonces = true;

  listeMotos: any[] = [];

  constructor(
    public listeMotoService: ListeMotosService,
    private http: HttpClient
  ) {}


  afficherAnnonces(){
    this.annonces = !this.annonces
  }

  ngOnInit(): void {
    this.listesAnnonces();
  }

  // Liste des voitures
  listesAnnonces(): void {
    const categorieId = 3; // Remplacez par l'ID de la catégorie dont vous souhaitez récupérer les annonces
    this.listeMotoService.getAnnonces(categorieId).subscribe(
      (annonces) => {
        console.log('annonces: ', annonces);
        this.listeMotos = annonces;
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
