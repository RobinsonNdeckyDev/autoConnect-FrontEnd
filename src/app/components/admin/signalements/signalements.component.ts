import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListeUsersService } from 'src/app/services/liste-users.service';
import { SignalementService } from 'src/app/services/signalement.service';

@Component({
  selector: 'app-signalements',
  templateUrl: './signalements.component.html',
  styleUrls: ['./signalements.component.css'],
})
export class SignalementsComponent {
  dtOptions: DataTables.Settings = {};

  constructor(
    private http: HttpClient,
    private listeSignalService: SignalementService,
    private listeAcheteurService: ListeUsersService
  ) {}

  tabSignalements: any[] = [];
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
      pageLength: 6,
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
    this.listeSignalService.listeSignals().subscribe(
      (response: any) => {
        console.log('listeSignalements: ', response);
        this.tabSignalements = response.signalements;
        console.log('listeSignalements: ', this.tabSignalements);

        // L'utilisateur qui a signalé l'annonce
        this.tabSignalements.forEach(signalement => {
          const proprietaireAnnonce = this.tabAcheteurs.find(user => user.id === signalement.user_id);
          // signalement.infoUserSignal = proprietaireAnnonce;
          this.infoUserSignal = proprietaireAnnonce;
          console.log("infoUserSignal: ", proprietaireAnnonce);
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
