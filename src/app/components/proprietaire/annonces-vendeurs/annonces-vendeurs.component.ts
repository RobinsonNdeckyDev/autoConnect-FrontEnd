import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonces-vendeurs',
  templateUrl: './annonces-vendeurs.component.html',
  styleUrls: ['./annonces-vendeurs.component.css'],
})
export class AnnoncesVendeursComponent {
  annonces = true;
  validesAnnonces: any[] = [];
  invalidesAnnonces: any[] = [];
  tabUsers: any[] = [];
  // Variable pour stocker l'annonce sélectionné
  annonceSelectionnee: any;
  // variable pour stocker les infos du proprietaire
  infoProprietaire: any;
  // Infos annonce sélectionnée
  infoAnnonceSelected: any;

  constructor(
    private route: ActivatedRoute,
    private annoncesValidesProps: PublierAnnonceService,
    private proprietaireService: ListeUsersService
  ) {}

  afficherAnnonces() {
    this.annonces = !this.annonces;
  }

  ngOnInit() {
    // annonces valides
    this.annoncesValides();
    this.annoncesInvalides();
    this.listeProprietaire();
    // this.afficherDetailAnnonceValide(this.annonces);
  }

  // Annonces valides

  annoncesValides() {
    this.annoncesValidesProps.getAnnonceUserValide().subscribe(
      (response: any) => {
        console.log(response);
        this.validesAnnonces = Object.values(response.annonceUserValides);
        console.log('Annonce valides: ', this.validesAnnonces);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Annonce invalides
  annoncesInvalides() {
    this.annoncesValidesProps.getAnnonceUserInvalide().subscribe(
      (response: any) => {
        console.log(response);
        this.invalidesAnnonces = Object.values(response.annonceUserInvalides);
        console.log('Annonces invalides: ', this.invalidesAnnonces);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Méthode pour récupérer la liste des propriétaires
  listeProprietaire() {
    // on recupere la liste des utilisateurs
    this.proprietaireService.getProprietaires().subscribe((response: any) => {
      console.log('proprietaires: ', response);
      this.tabUsers = response.proprietaire;
      console.log('tabUsers: ', this.tabUsers);
    });
  }

  // Méthode pour afficher les details d'une annonce valide
  afficherDetailAnnonceInvalide(annonce: any) {
    this.annonceSelectionnee = annonce;
    console.log('Annonce sélectionnée: ', this.annonceSelectionnee);

    // on stocke les infos de l'annonce selectionnée dans infoAnnonceselected
    this.infoAnnonceSelected = this.validesAnnonces.find(
      (annonce) => annonce.id === this.annonceSelectionnee
    );
    console.log('info annonce selected: ', this.infoAnnonceSelected);

    // Le proprietaire de l'annonce
    let proprietaire = this.infoAnnonceSelected.user_id;
    console.log("l'id du proprietaire", proprietaire);

    // On recherche le propriétaire qui a les infos de user_id
    this.infoProprietaire = this.tabUsers.find(
      (user: any) => user.id === proprietaire
    );
    console.log(
      'Informations du proprietaire à qui appartient cette annonce ',
      this.infoProprietaire
    );
    console.log(this.infoProprietaire.nom);
  }

  // Méthode pour afficher les details d'une annonce invalide
  afficherDetailAnnonceValide(annonce: any) {
    this.annonceSelectionnee = annonce;
    console.log('Annonce sélectionnée: ', this.annonceSelectionnee);

    // on stocke les infos de l'annonce selectionnée dans infoAnnonceselected
    this.infoAnnonceSelected = this.validesAnnonces.find(
      (annonce) => annonce.id === this.annonceSelectionnee
    );
    console.log('info annonce selected: ', this.infoAnnonceSelected);

    // Le proprietaire de l'annonce
    let proprietaire = this.infoAnnonceSelected.user_id;
    console.log("l'id du proprietaire", proprietaire);

    // On recherche le propriétaire qui a les infos de user_id
    this.infoProprietaire = this.tabUsers.find(
      (user: any) => user.id === proprietaire
    );
    console.log(
      'Informations du proprietaire à qui appartient cette annonce ',
      this.infoProprietaire
    );
    console.log(this.infoProprietaire.nom);
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
        // this.annonceServiceEtat
        //   .updateAnnonceState(annonceId, newState)
        //   .subscribe(() => {
        //     // Mettre à jour l'état de l'annonce après avoir reçu la réponse du serveur
        //     this.annonceSelectionnee.etat = newState;
        //     this.alertMessage(
        //       'success',
        //       'Super',
        //       'Annonce activée avec succés'
        //     );
        //     this.listesAnnonces();
        //     this.listesAnnonces();
        //   });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("L'activation de l'annonce a été annulée.");
        this.alertMessage('info', 'Annulée', "Activation de l'annonce annulée");
      }
    });
  }

  // Mise à jour de l'eta de l'annonce
  updateAnnonceStateInactive(newState: string): void {
    // l'identifiant de l'annonce est stocké dans la propriété 'id'
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
        // this.annonceServiceEtat
        //   .updateAnnonceState(annonceId, newState)
        //   .subscribe(() => {
        //     // Mettre à jour l'état de l'annonce après avoir reçu la réponse du serveur
        //     this.annonceSelectionnee.etat = newState;
        //     this.alertMessage(
        //       'success',
        //       'Super',
        //       'Annonce désactivée avec succés'
        //     );
        //     this.listesAnnonces();
        //   });
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
        // this.listeVoitureService.deleteAnnonce(annonceId).subscribe(
        //   (response) => {
        //     console.log(response);
        //     this.alertMessage(
        //       'success',
        //       'Super',
        //       'Annonce supprimée avec succés'
        //     );
        //     this.listesAnnonces();
        //   },
        //   (error) => {
        //     console.log(error);
        //   }
        // );
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
