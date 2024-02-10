import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { SignalementService } from 'src/app/services/signalement.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css'],
})
export class CommentairesComponent {
  dtOptions: DataTables.Settings = {};

  constructor(
    private http: HttpClient,
    private listeCommentService: CommentaireService,
    private listeAcheteurService: ListeUsersService
  ) {}

  tabCommentaires: any[] = [];
  tabAcheteurs: any[] = [];
  infoUserSignal: any;

  ngOnInit(): void {
    // Liste acheteurs
    this.getAcheteurs();

    // liste signalements
    this.getSignals();

    // dtOptions
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      pageLength: 5,
      pagingType: 'simple_numbers',
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',

        paginate: {
          first: '<<', // Personnalise le texte de la flèche pour la première page
          previous: '<', // Personnalise le texte de la flèche pour la page précédente
          next: '>', // Personnalise le texte de la flèche pour la page suivante
          last: '>>', // Personnalise le texte de la flèche pour la dernière page
        },
      },
    };
  }

  // Getsignals
  getSignals() {
    this.listeCommentService.getcommentaires().subscribe(
      (response: any) => {
        console.log('listeSignalements: ', response);
        this.tabCommentaires = response.commentaires;
        console.log('listeSignalements: ', this.tabCommentaires);

        // L'utilisateur qui a signalé l'annonce
        this.tabCommentaires.forEach((commentaire) => {
          const proprietaireAnnonce = this.tabAcheteurs.find(
            (user) => user.id === commentaire.user_id
          );
          // commentaire.infoUserSignal = proprietaireAnnonce;
          this.infoUserSignal = proprietaireAnnonce;
          console.log('infoUserSignal: ', proprietaireAnnonce);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Get acheteurs
  getAcheteurs() {
    this.listeAcheteurService.getAcheteurs().subscribe(
      (response: any) => {
        console.log('listeAcheteurs: ', response);
        this.tabAcheteurs = response.acheteur;
        console.log('listeAcheteurs: ', this.tabAcheteurs);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
