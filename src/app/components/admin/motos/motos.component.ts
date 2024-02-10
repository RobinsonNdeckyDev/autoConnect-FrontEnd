import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListeMotosService } from 'src/app/services/liste-motos.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-motos',
  templateUrl: './motos.component.html',
  styleUrls: ['./motos.component.css'],
})
export class MotosComponent {
  annonces = true;
  annoncesMotosFiltreesActives: any[] = [];
  annoncesMotosFiltreesInactives: any[] = [];

  listeMotos: any[] = [];
  listeMotosActives: any[] = [];
  annoncesMotosFiltrees: any[] = [];

  // Variable pour stocker l'annonce sélectionné
  annonceSelectionnee: any;

  constructor(
    public listeMotoService: ListeMotosService,
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

  // Liste des voitures
  listesAnnonces(): void {
    // Remplacez par l'ID de la catégorie dont vous souhaitez récupérer les annonces
    const categorieId = 2;
    const etat = 'refuser';
    const etatInactive = 'accepter';

    this.listeMotoService.getAnnonces(categorieId).subscribe(
      (response: any) => {
        console.log(response.annonces);
        this.listeMotos = response.annonces;

        this.annoncesMotosFiltreesInactives = this.listeMotos.filter(
          (annonceMoto) => annonceMoto.etat === etat
        );
        console.log(
          'Annonces filtrées motos Actives : ',
          this.annoncesMotosFiltreesInactives
        );

        this.annoncesMotosFiltreesActives = this.listeMotos.filter(
          (annonceMoto) => annonceMoto.etat === etatInactive
        );

        console.log(
          'Annonces filtrées motos Inactives : ',
          this.annoncesMotosFiltreesActives
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

  // Détail d'une annonce

  // Méthode pour récupérer la liste des propriétaires
  listeProprietaire() {
    // on recupere la liste des utilisateurs
    this.proprietaireService.getProprietaires().subscribe((resp: any) => {
      this.tabUsers = resp.proprietaire;
    });
  }

  // Variable pour stocker les utilisateurs
  tabUsers: any[] = [];
  infoProprietaire: any;

  // Méthode pour afficher les details d'une annonce
  afficherDetailAnnonce(moto: any) {
    this.annonceSelectionnee = moto;
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
            // Mettre à jour l'état de l'annonce après avoir reçu la réponse du serveur
            this.annonceSelectionnee.etat = newState;
            this.listesAnnonces();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("L'activation de l'annonce a été annulée.");
        this.alertMessage('info', 'Annulée', "Activation de l'annonce annulée");
      }
    });
  }

  // supprimer Annonce
  detetedAnnonce(annonceId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette annonce ?',
      text: 'Vous allez supprimer cette annonce !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, d"sactiver"
        this.listeMotoService.deleteAnnonce(annonceId).subscribe(
          (response) => {
            console.log(response);
            this.alertMessage(
              'success',
              'Super',
              'Annonce supprimée avec succés'
            );
            this.listesAnnonces();
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("La suppression de l'annonce a été annulée.");
        this.alertMessage(
          'info',
          'Annulée',
          "Suppression de l'annonce annulée"
        );
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
