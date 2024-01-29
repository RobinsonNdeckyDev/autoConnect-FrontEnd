import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeContactsService } from 'src/app/services/liste-contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  messages: any[] = [];
  selectedMessage: any; // Pour stocker le message sélectionné
  isModalOpen: boolean = false; // Variable pour contrôler l'ouverture du modal

  constructor(
    private listeContacts: ListeContactsService,
    private route: Router,
    http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  // Liste des contacts
  getContacts(): void {
    this.listeContacts.getMessages().subscribe(
      (response: any) => {
        console.log(response.messages); // Affiche le tableau des categories dans la console

        // Maintenant, vous pouvez accéder à l'array categorie
        this.messages = response.messages;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des categories : ",
          error
        );
      }
    );
  }

  // Méthode pour supprimer le message sélectionné
  deleteMessage(message: any) {
    const messageId = message.id;
    console.log(messageId);
    this.listeContacts.deleteMessage(messageId).subscribe(
      () => {
        // Suppression côté client
        const index = this.messages.indexOf(message);
        if (index !== -1) {
          this.messages.splice(index, 1);
        }
        this.selectedMessage = null; // Effacer le message sélectionné après la suppression
        console.log('Le message a été supprimé avec succès.');
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la suppression du message : ",
          error
        );
      }
    );
  }

  // Méthode pour ouvrir le modal avec le message sélectionné
  openModal(message: any) {
    this.selectedMessage = message;
  }
}
