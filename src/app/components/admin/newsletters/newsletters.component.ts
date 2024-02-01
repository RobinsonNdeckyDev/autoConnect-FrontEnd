import { Component } from '@angular/core';
import { ListeNewslettersService } from 'src/app/services/liste-newsletters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.css'],
})
export class NewslettersComponent {
  newsletters: any[] = [];

  constructor(private listeNews: ListeNewslettersService) {}

  ngOnInit(): void {
    this.getNewsletters();
  }

  // Liste des Blogs
  getNewsletters(): void {
    this.listeNews.getNewsletters().subscribe(
      (response: any) => {
        console.log(response.newsLetters); // Affiche le tableau des newsletters dans la console

        // Maintenant, vous pouvez accéder à l'array categorie
        this.newsletters = response.newsLetters;
        console.log(this.newsletters);
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des newsletters : ",
          error
        );
      }
    );
  }

  // Supprimmer un abonné
  supprimerBlog(newsId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce blog ?',
      text: 'Vous allez supprimer ce blog !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, supprimer',
    }).then((result) => {
      this.listeNews.deleteNewsletter(newsId).subscribe(
        () => {
          console.log('L\'abonné a été supprimé avec succès.');
          // Réaliser d'autres actions après la suppression si nécessaire
          this.alertMessage('success', 'réussie', 'Abonné supprimé avec succés');

          this.getNewsletters();
        },
        (error) => {
          console.error(
            "Une erreur s'est produite lors de la suppression de l'abonné :",
            error
          );
          this.alertMessage(
            'error',
            'Oops',
            'Erreur lors de la suppression de l\'abonné'
          );
          // Gérer l'erreur de suppression de l'abonné
        }
      );
    });
  }


  // Vider champ
  viderChamps() {
    // this.titre = '';
    // this.image = '';
    // this.description = '';
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
