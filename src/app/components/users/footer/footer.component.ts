import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  newsletter: string = '';

  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

  subscribeNews() {
    if (this.newsletter == '') {
      this.alertMessage('error', 'Désolé', 'Merci de renseigner vorte email');
    }else if(!this.newsletter.match(this.emailPattern)){
      this.alertMessage('error', 'Désolé', 'Merci de renseigner un email valide');
    }else{
      this.alertMessage('success', 'Bravo', 'Vous etes maintenant abonné à la newsletter');
    }
  }

  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
