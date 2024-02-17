import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeMotosService } from 'src/app/services/liste-motos.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';

@Component({
  selector: 'app-motos',
  templateUrl: './motos.component.html',
  styleUrls: ['./motos.component.css'],
})
export class MotosComponent {
  listeMotos: any;
  tabProprietaires: any;
  ListeAnnonces: any;
  motoSelected: any;
  proprietaireInfo: any;

  constructor(
    private listeMotoService: ListeMotosService,
    private listeAnnonceService: PublierAnnonceService,
    private proprietaireService: ListeUsersService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getProprietaire();

    this.getAnnoncesValides();
  }

  // Méthode pour récupérer la liste des propriétaires
  getProprietaire() {
    // on recupere la liste des utilisateurs
    this.proprietaireService.getProprietaires().subscribe((response: any) => {
      console.log(response);
      console.log(response);
      this.tabProprietaires = response.proprietaire;
      console.log('liste props: ', this.tabProprietaires);
    });
  }

  // Liste des annonces mises en avant
  getAnnoncesValides() {
    let categorie = 9;

    this.listeAnnonceService.getAnnonceValideProp().subscribe(
      (response: any) => {
        console.log(response);
        // liste motos
        this.ListeAnnonces = response.annonceValides;
        console.log('annonces: ', this.ListeAnnonces);

        this.listeMotos = this.ListeAnnonces.filter(
          (element: any) => element.categorie_id === categorie
        );
        console.log("Liste motos", this.listeMotos);

        // On recherche le propriétaire qui a les infos de user_id
        // this.listeMotos.forEach((moto: any) => {
        //   const proprietaire = this.tabProprietaires.find(
        //     (user: any) => user.id === moto.user_id
        //   );
        //   if (proprietaire) {
        //     moto.proprietaireInfo = proprietaire;
        //     console.log(
        //       'Informations du proprietaire à qui appartient cette annonce ',
        //       proprietaire
        //     );
        //     console.log('nom du proprietaire: ', proprietaire.nom);
        //   }
        // });

      },
      (error) => {
        console.log(error);
      }
    );
  }

  // redirection vers la page details blog
  redirectToDetails(motoId: number) {
    this.motoSelected = motoId;
    console.log(this.motoSelected);
    this.route.navigate(['vehicules/motos/detailMoto', motoId]);
  }
}
