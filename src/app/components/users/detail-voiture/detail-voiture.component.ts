import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListeVoituresService } from 'src/app/services/liste-voitures.service';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import { switchMap } from 'rxjs/operators';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { SignalementService } from 'src/app/services/signalement.service';
import Swal from 'sweetalert2';
import { error } from 'jquery';
import { CommentaireService } from 'src/app/services/commentaire.service';

@Component({
  selector: 'app-detail-voiture',
  templateUrl: './detail-voiture.component.html',
  styleUrls: ['./detail-voiture.component.css'],
})
export class DetailVoitureComponent {
  listeVoitures: any;
  voitureId?: number;
  voitureDetails: any;
  tabProprietaires: any[] = [];
  proprietaireInfo: any;
  voitureSelected: any;
  raisonSignal: string = '';
  commentaire: string = '';
  tabCommentaires: any[] = [];
  commentAnnonce: any;
  userComment: any;
  topComments: any;
  annonceId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private listeVoitureService: ListeVoituresService,
    private listeAnnonceService: PublierAnnonceService,
    private proprietaireService: ListeUsersService,
    private commentService: CommentaireService,
    private signalService: SignalementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCommentaires();

    // Récupérer l'ID de l'annonce depuis les paramètres de l'URL
    this.route.params.subscribe((params) => {
      this.annonceId = params['id'];
      console.log('id: ' + this.annonceId);
      // Appeler le service pour récupérer tous les commentaires
      // commentaires
    });

    this.getProprietaire();

    // id voiture
    this.identifiantVoiture();

    // detail du blog
    this.getVoiture();

    // Annonce en avant
    this.getAnnoncesEnAvant();
  }

  // identifiant voiture
  identifiantVoiture() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.voitureId = +id;
      console.log(this.voitureId);
      // Utilisez cet ID pour charger les détails du blog
    } else {
      // Traitez le cas où l'ID est null
    }
  }

  // Méthode pour récupérer la liste des propriétaires
  getProprietaire() {
    // on recupere la liste des utilisateurs
    this.proprietaireService.getProprietaires().subscribe((response: any) => {
      console.log(response);
      this.tabProprietaires = response.proprietaire;
      console.log('liste props: ', this.tabProprietaires);
    });
  }

  // Infos annonce
  getVoiture() {
    if (this.voitureId !== undefined) {
      let idVoiture: number = this.voitureId;
      this.listeVoitureService.infoVoiture(idVoiture).subscribe(
        (response: any) => {
          console.log('Détails de la voiture: ', response.annonce);
          // Enregistrer les détails de la voiture dans la variable voitureDetail
          this.voitureDetails = response.annonce;
          console.log('detail voiture: ', this.voitureDetails);
          console.log('commentaire auto: ', this.voitureDetails.commentaires);

          // On récupère le propriètaire de l'annonce
          console.log('id du prop: ', this.voitureDetails.user_id);

          // On recherche le propriétaire qui a les infos de user_id
          this.proprietaireInfo = this.tabProprietaires.find(
            (user: any) => user.id === this.voitureDetails.user_id
          );
          console.log(
            'Informations du proprietaire à qui appartient cette annonce ',
            this.proprietaireInfo
          );
          console.log('nom du proprietaire: ', this.proprietaireInfo.nom);
        },
        (error) => {
          console.log(
            'Erreur lors de la récupération des détails de la voiture: ',
            error
          );
        }
      );
    } else {
      // Traitez le cas où l'ID de la voiture est undefined
    }
  }

  // liste commentaires
  getCommentaires() {
    this.commentService.getcommentaires().subscribe(
      (response: any) => {
        console.log('Liste des commentaires: ', response.commentaires);

        // récupération des commentaires dans tabCommentaires
        this.tabCommentaires = response.commentaires;
        console.log('TabCommentaires: ', this.tabCommentaires);
        console.log("L'id de annonce: ", this.annonceId);
        console.log(typeof this.annonceId);

        // Convertir annonceId en nombre si nécessaire
        let identifiantAnnonce: number = Number(this.annonceId);
        console.log('identifiantAnnonce: ', identifiantAnnonce);
        console.log('identifiantAnnonce: ', typeof identifiantAnnonce);

        // Filtrer les commentaires pour ne récupérer que ceux liés à l'annonce sélectionnée
        this.commentAnnonce = this.tabCommentaires.filter(
          (comment) => parseInt(comment.annonce_id, 10) === identifiantAnnonce
        );

        console.log('comments of annonce: ', this.commentAnnonce);

        // top commentaires
        this.topComments = this.commentAnnonce.slice(0, 3);
        console.log(this.topComments);
        this.getCommentaires();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Liste des annonces mises en avant
  getAnnoncesEnAvant() {
    this.listeAnnonceService.getAnnonceMisesEnAvant().subscribe(
      (response: any) => {
        console.log(response);
        // liste voitures
        this.listeVoitures = response.annoncesMisesEnAvant.voiture;
        console.log('voitures: ', this.listeVoitures.slice(0, 3));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // redirection vers la page details voiture
  redirectToDetails(voitureId: number) {
    // this.identifiantVoiture();
    this.router.navigate(['vehicules/voitures/detailVoiture', voitureId]);
    // this.getVoiture();
  }

  // Signalement annonce
  addSignal(idAnnonce: number) {
    console.log(this.raisonSignal);

    if (this.raisonSignal == '') {
      this.alertMessage('error', 'Oops', 'Merci de renseigner le motif');
    } else {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir signaler cette annonce ?',
        text: 'Vous allez signaler cette annonce !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0F42A8',
        cancelButtonColor: 'black',
        confirmButtonText: 'Oui, signaler',
      }).then((result) => {
        if (result.isConfirmed) {
          // Si l'utilisateur clique sur "Oui, d"sactiver"
          let newSignal: any = {
            description: this.raisonSignal,
          };

          this.signalService.signalAnnonce(idAnnonce, newSignal).subscribe(
            (response) => {
              console.log(response);
              this.alertMessage(
                'success',
                'Signalée',
                "Signalement de l'annonce effectué avec succés"
              );
            },
            (error) => {
              console.log(error);
              this.alertMessage(
                'warning',
                'Impossible',
                'Vous devez vous connectez pour soumettre un signalement'
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Si l'utilisateur clique sur "Annuler"
          console.log("Le signalement de l'annonce a été annulée.");
          this.alertMessage(
            'info',
            'Annulée',
            "Signalement de l'annonce annulée"
          );
        }
      });
    }
  }

  // Signalement annonce
  addComment(idAnnonce: number) {
    console.log(this.commentaire);

    if (this.commentaire == '') {
      this.alertMessage('error', 'Oops', 'Merci de renseigner un commentaire');
    } else {
      // Si l'utilisateur clique sur "Oui, d"sactiver"
      let newComment: any = {
        commentaire: this.commentaire,
      };

      this.commentService.commentAnnonce(idAnnonce, newComment).subscribe(
        (response) => {
          console.log(response);
          this.alertMessage(
            'success',
            'Envoyé',
            'Commentaire effectué avec succés'
          );
        },
        (error) => {
          console.log(error);
          // this.alertMessage('Oops', 'Non envoyé', 'Commentaire non effectué');
          this.alertMessage(
            'warning',
            'Impossible',
            'Vous devez vous connectez pour soumettre un commentaire'
          );
        }
      );
    }
  }

  // Alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  // clean form
  cleanForm() {
    this.raisonSignal = '';
  }
}
