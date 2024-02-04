import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { ListeUtilitairesService } from 'src/app/services/liste-utilitaires.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilitaires',
  templateUrl: './utilitaires.component.html',
  styleUrls: ['./utilitaires.component.css'],
})
export class UtilitairesComponent {
  annonces = true;
  listeUtilitaires: any[] = [];
  listeUtilitairesActives: any[] = [];
  annoncesUtilitairesFiltreesActivees: any[] = [];
  annoncesUtiltairesFiltreesInactives: any[] = [];

  // Variable pour stocker l'annonce sélectionné
  annonceSelectionnee: any;

  constructor(
    public listeUtilitaireService: ListeUtilitairesService,
    private proprietaireService: ListeUsersService,
    private annonceServiceEtat: PublierAnnonceService,
    private http: HttpClient
  ) {}

  afficherAnnonces() {
    this.annonces = !this.annonces;
  }

  ngOnInit(): void {
    this.listesAnnonces();
    // initialisation de la liste des proprietaires
    this.listeProprietaire();
  }

  // Liste proprietaires
  listeProprietaire() {
    // on recupere la liste des utilisateurs
    this.proprietaireService.getProprietaires().subscribe((resp: any) => {
      this.tabUsers = resp.proprietaire;
    });
  }

  // Liste des utilitaires
  listesAnnonces(): void {
    // Remplacez par l'ID de la catégorie dont vous souhaitez récupérer les annonces
    const categorieId = 3;
    const etat = 'refuser';
    const etatInactive = 'accepter';

    this.listeUtilitaireService.getAnnonces(categorieId).subscribe(
      (response: any) => {
        console.log(response.annonces);
        this.listeUtilitaires = response.annonces;

        this.annoncesUtilitairesFiltreesActivees = this.listeUtilitaires.filter(
          (annonceUtilitaire) => annonceUtilitaire.etat === etat
        );
        console.log(
          'Annonces utilitaires filtrées actives : ',
          this.annoncesUtilitairesFiltreesActivees
        );

        this.annoncesUtiltairesFiltreesInactives = this.listeUtilitaires.filter(
          (annonceUtilitaire) => annonceUtilitaire.etat === etatInactive
        );
        console.log(
          'Annonces utilitaires filtrées inactives : ',
          this.annoncesUtiltairesFiltreesInactives
        );
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des annonces : ",
          error
        );
      }
    );
  }

  // Variable pour stocker les utilisateurs
  tabUsers: any[] = [];
  infoProprietaire: any;

  // Méthode pour afficher les details d'une annonce
  afficherDetailAnnonce(utilitaire: any) {
    this.annonceSelectionnee = utilitaire;
    console.log(this.annonceSelectionnee);

    // On récupère le propriètaire de l'annonce
    console.log(this.annonceSelectionnee.user_id);

    // On recherche le propriétaire qui a les infos de user_id
    this.infoProprietaire = this.tabUsers.find(
      (user: any) => user.id === this.annonceSelectionnee.user_id
    );
    console.log(
      'Informations du proprietaire à qui appartient cette annonce ',
      this.infoProprietaire
    );
    console.log(this.infoProprietaire.nom);
  }

  idUserwhatsap: any;
  telUserWhatsapp: any;

  // Mise à jour de l'etat de l'annonce

  updateAnnonceStateInactive(newState: string): void {
    // Supposons que l'identifiant de l'annonce est stocké dans la propriété 'id'
    const annonceId = this.annonceSelectionnee.id;

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir désactiver cette annonce ?',
      text: 'Vous allez désactiver cette annonce !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, désactiver',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, d"sactiver"
        this.annonceServiceEtat
          .updateAnnonceState(annonceId, newState)
          .subscribe(() => {
            // Mettre à jour l'état de l'annonce dans votre frontend après avoir reçu la réponse du serveur
            this.annonceSelectionnee.etat = newState;
            this.alertMessage(
              'success',
              'Super',
              'Annonce désactivée avec succés'
            );
            this.listesAnnonces();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("La désactivation de l'annonce a été annulée.");
        this.alertMessage(
          'info',
          'Annulée',
          "Désctivation de l'annonce annulée"
        );
      }
    });
  }

  // Mise à jour de l'etat de l'annonce

  updateAnnonceStateActive(newState: string): void {
    // l'identifiant de l'annonce est stocké dans la propriété 'id'
    const annonceId = this.annonceSelectionnee.id;

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir activer cette annonce ?',
      text: 'Vous allez activer cette annonce !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, activer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, activer"
        this.annonceServiceEtat
            .updateAnnonceState(annonceId, newState)
            .subscribe(() => {
              // Mettre à jour l'état de l'annonce dans votre frontend après avoir reçu la réponse du serveur
              this.annonceSelectionnee.etat = newState;
              this.alertMessage(
                'success',
                'Super',
                'Annonce activée avec succés'
              );
              this.listesAnnonces();
            });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("L'activation de l'annonce a été annulée.");
        this.alertMessage('info', 'Annulée', "Activation de l'annonce annulée");
      }
    });
  }


  // Alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  
}
