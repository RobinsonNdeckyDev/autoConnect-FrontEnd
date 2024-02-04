import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListeContactsService } from 'src/app/services/liste-contacts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  nomComplet: string = '';
  email: string = '';
  message: string = '';

  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  constructor(
    private contactService: ListeContactsService,
    private http: HttpClient
  ) {}

  newContact() {
    if (this.nomComplet == '') {
      this.alertMessage(
        'error',
        'Oops!',
        'Merci de renseigner votre nom complet!'
      );
    } else if (this.email == '') {
      this.alertMessage('error', 'Oops!', 'Merci de renseigner votre email!');
    } else if (this.message == '') {
      this.alertMessage('error', 'Oops!', 'Merci de renseigner votre message!');
    } else if (!this.email.match(this.emailPattern)) {
      this.alertMessage('error', 'Oops!', 'Merci de renseigner une adresse mail valide!');
    } else {
      let newAbonne = {
        nomComplet: this.nomComplet,
        email: this.email,
        message: this.message,
      };

      this.contactService.addMessage(newAbonne).subscribe((response: any) => {
        this.alertMessage('success', 'Super', 'Message envoyé avec succés');
        console.log(response);
        this.viderChamps();
      });
    }
  }

  // vider champs
  viderChamps() {
    this.nomComplet = '';
    this.email = '';
    this.message = '';
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
