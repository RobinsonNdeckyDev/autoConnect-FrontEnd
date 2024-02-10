import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { error } from 'jquery';
import { AuthenticationService } from 'src/app/services/authentification.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { ListeVoituresService } from 'src/app/services/liste-voitures.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css'],
})
export class VoituresComponent {
  annonces = true;
  listeVoitures: any[] = [];
  listeVoituresActives: any[] = [];
  annoncesVoituresFiltreesActives: any[] = [];
  annoncesVoituresFiltreesInactives: any[] = [];

  // Variable pour stocker l'annonce sélectionné
  annonceSelectionnee: any;

  constructor(
    public listeVoitureService: ListeVoituresService,
    private proprietaireService: ListeUsersService,
    private annonceServiceEtat: PublierAnnonceService
  ) {}

  afficherAnnonces() {
    this.annonces = !this.annonces;
  }

  ngOnInit(): void {
    // initialisation de la liste des anonces
    this.listesAnnonces();

    // initialisation de la liste des proprietaires
    this.listeProprietaire();

    // propInfo
    // this.propInfo();
  }

  // Liste des voitures
  listesAnnonces(): void {
    // Remplacez par l'ID de la catégorie dont vous souhaitez récupérer les annonces
    const categorieId = 1;
    const etat = 'refuser';
    const etatInactive = 'accepter';

    this.listeVoitureService.getAnnonces(categorieId).subscribe(
      (response: any) => {
        console.log(response.annonces);
        this.listeVoitures = response.annonces;

        this.annoncesVoituresFiltreesActives = this.listeVoitures.filter(
          (annonceVoiture) => annonceVoiture.etat === etat
        );
        console.log(
          'Annonces filtrées Actives : ',
          this.annoncesVoituresFiltreesActives
        );

        this.annoncesVoituresFiltreesInactives = this.listeVoitures.filter(
          (annonceVoiture) => annonceVoiture.etat === etatInactive
        );

        console.log(
          'Annonces filtrées Inactives : ',
          this.annoncesVoituresFiltreesInactives
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
  afficherDetailAnnonce(voiture: any) {
    this.annonceSelectionnee = voiture;
    console.log(this.annonceSelectionnee);

    // On récupère le propriètaire de l'annonce
    console.log(this.annonceSelectionnee.user_id);

    this.propInfo();

  }



  propInfo(){
    // / On recherche le propriétaire qui a les infos de user_id
    this.infoProprietaire = this.tabUsers.find(
      (user: any) => user.id === this.annonceSelectionnee.user_id
    );
    console.log(
      'Informations du proprietaire à qui appartient cette annonce ',
      this.infoProprietaire
    );
    console.log(this.infoProprietaire);
  }

  idUserwhatsap: any;
  telUserWhatsapp: any;

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
            this.alertMessage(
              'success',
              'Super',
              'Annonce activée avec succés'
            );
            this.listesAnnonces();
            this.listesAnnonces();
          });
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
      confirmButtonText: 'Oui, désactiver'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, d"sactiver"
        this.annonceServiceEtat
          .updateAnnonceState(annonceId, newState)
          .subscribe(() => {
            // Mettre à jour l'état de l'annonce après avoir reçu la réponse du serveur
            this.annonceSelectionnee.etat = newState;
            this.alertMessage("success", "Super", "Annonce désactivée avec succés");
            this.listesAnnonces();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log("La désactivation de l'annonce a été annulée.");
        this.alertMessage('info', 'Annulée', "Désctivation de l'annonce annulée");
      }
    });
  }

  // supprimer Annonce
  detetedAnnonce(annonceId: number){

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
         this.listeVoitureService.deleteAnnonce(annonceId).subscribe(
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
