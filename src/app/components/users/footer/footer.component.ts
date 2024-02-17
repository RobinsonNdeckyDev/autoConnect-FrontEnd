import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListeNewslettersService } from 'src/app/services/liste-newsletters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  newsletter: string = '';

  constructor(
    private http: HttpClient,
    private newsletterService: ListeNewslettersService
  ) {}

  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;


  // Abonnement newsletter
  subscribeNews() {
    if (this.newsletter == '') {
      this.alertMessage('error', 'Désolé', 'Merci de renseigner vorte email');
    } else if (!this.newsletter.match(this.emailPattern)) {
      this.alertMessage(
        'error',
        'Désolé',
        'Merci de renseigner un email valide'
      );
    } else {
      let newSubscriberNews = {
        email: this.newsletter,
      };

      this.newsletterService
        .addNewSubscribeNews(newSubscriberNews)
        .subscribe((response: any) => {
          this.alertMessage('success', 'Super', 'Vous etes maintenant abonné à notre newsletter');
          console.log(response);
          this.viderChamps();
        });
    }
  }

  // vider champs
  viderChamps() {
    this.newsletter = '';
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
