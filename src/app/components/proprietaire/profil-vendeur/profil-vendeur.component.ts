import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-profil-vendeur',
  templateUrl: './profil-vendeur.component.html',
  styleUrls: ['./profil-vendeur.component.css'],
})
export class ProfilVendeurComponent implements OnInit {

  vendeurData: any = {
    nom: '',
    email: '',
    telephone: '',
    password: '',
    adresse: '',
    description: '',
    imgProfil: '',
  };
  isEditMode: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    const vendeurId = this.getLoggedInUserId();
    this.getvendeurDetails(vendeurId);
  }

  getvendeurDetails(vendeurId: number) {
    this.authService.getvendeurDetails(vendeurId).subscribe(
      (data) => {
        this.vendeurData = data;
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'vendeur:",
          error
        );
      }
    );
  }

  updatevendeurDetails() {
    const vendeurId = this.vendeurData.id;
    this.authService
      .updatevendeurDetails(vendeurId, this.vendeurData)
      .subscribe(
        (response) => {
          console.log(
            "Informations de l'vendeur mises à jour avec succès:",
            response
          );
          this.isEditMode = false;
        },
        (error) => {
          console.error(
            "Erreur lors de la mise à jour des informations de l'vendeur:",
            error
          );
        }
      );
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  // Méthode fictive pour récupérer l'ID de l'utilisateur connecté
  getLoggedInUserId(): number {
    // Implémentez la logique pour récupérer l'ID de l'utilisateur connecté
    // à partir du token JWT ou d'autres moyens appropriés
    return 1; // Par exemple, retourne l'ID 1 pour le test
  }
}






// import { Component } from '@angular/core';
// import { AuthenticationService } from 'src/app/services/authentification.service';

// @Component({
//   selector: 'app-profil-vendeur',
//   templateUrl: './profil-vendeur.component.html',
//   styleUrls: ['./profil-vendeur.component.css'],
// })
// export class ProfilVendeurComponent {
//   acheteurData: any;

//   constructor(private authService: AuthenticationService) {}

//   ngOnInit(): void {
//     // Récupérer l'ID de l'acheteur depuis l'authentification (vous devrez implémenter cette partie)
//     const acheteurId = this.getLoggedInUserId(); // Par exemple, récupérer l'ID de l'utilisateur connecté depuis le token JWT

//     // Récupérer les détails de l'acheteur
//     this.getAcheteurDetails(acheteurId);
//   }

//   getAcheteurDetails(acheteurId: number) {
//     this.authService.getAcheteurDetails(acheteurId).subscribe(
//       (data) => {
//         this.acheteurData = data;
//       },
//       (error) => {
//         console.error(
//           "Erreur lors de la récupération des informations de l'acheteur:",
//           error
//         );
//       }
//     );
//   }

//   updateAcheteurDetails() {
//     const acheteurId = this.acheteurData.id;
//     this.authService
//       .updateAcheteurDetails(acheteurId, this.acheteurData)
//       .subscribe(
//         (response) => {
//           console.log(
//             "Informations de l'acheteur mises à jour avec succès:",
//             response
//           );
//         },
//         (error) => {
//           console.error(
//             "Erreur lors de la mise à jour des informations de l'acheteur:",
//             error
//           );
//         }
//       );
//   }

//   // Méthode fictive pour récupérer l'ID de l'utilisateur connecté
//   getLoggedInUserId(): number {
//     // Implémentez la logique pour récupérer l'ID de l'utilisateur connecté
//     // à partir du token JWT ou d'autres moyens appropriés
//     return 1; // Par exemple, retourne l'ID 1 pour le test
//   }
// }
