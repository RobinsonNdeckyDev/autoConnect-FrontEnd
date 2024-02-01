import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publier-annonce',
  templateUrl: './publier-annonce.component.html',
  styleUrls: ['./publier-annonce.component.css'],
})
export class PublierAnnonceComponent {
  constructor(
    private publierAnnonce: PublierAnnonceService,
    private http: HttpClient
  ) {}

  // Attributs
  nom: string = '';
  marque: string = '';
  couleur: string = '';
  etat: string = 'refuser';
  image!: File;
  prix!: number;
  description = '';
  climatisation: string = '';
  kilometrage: string = '';
  nbrePlace!: number;
  localisation: string = '';
  moteur: string = '';
  annee!: number;
  carburant: string = '';
  carosserie: string = '';
  transmission: string = '';
  categorie_id: number = 0;
  image1!: File;
  image2!: File;
  image3!: File;
  image4!: File;

  // images!: File[];

  // Ajout d'une annonce
  addAnnonce() {
    if (this.nom == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le nom du véhicule'
      );
      return; // Empêche la soumission si le champ est vide
    } else if (this.marque == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner la marque du vehicule'
      );
      return;
    } else if (this.couleur == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner la couleur du véhicule'
      );
      return;
    } else if (this.prix == 0) {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le prix du vehicule'
      );
      return;
    } else if (this.description == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner une description du vehicule'
      );
      return;
    } else if (this.climatisation == '') {
      this.alertMessage('error', 'Oops', 'Merci de renseigner la clim');
      return;
    } else if (this.kilometrage == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le nombre de kilométrage parcouru par le véhicule'
      );
      return;
    } else if (this.localisation == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le lieu où se trouve le véhicule'
      );
      return;
    } else if (this.moteur == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner des infos sur le moteur'
      );
      return;
    } else if (this.annee == 0) {
      this.alertMessage(
        'error',
        'Oops',
        "Merci de renseigner l'annee du vehicule"
      );
      return;
    } else if (this.carburant == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le type de carburant du vehicule'
      );
      return;
    } else if (this.carosserie == '') {
      this.alertMessage('error', 'Oops', 'Merci de renseigner les ');
      return;
    } else if (this.categorie_id == 0) {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner la catégorie du véhicule'
      );
      return;
    } else {
      let newAnnonce = new FormData();
      // let image = new FormData();
      newAnnonce.append('nom', this.nom);
      newAnnonce.append('marque', this.marque);
      newAnnonce.append('couleur', this.couleur);
      newAnnonce.append('image', this.image as Blob);
      newAnnonce.append('prix', `${this.prix}`);
      newAnnonce.append('description', this.description);
      newAnnonce.append('nbrePlace', `${this.nbrePlace}`);
      newAnnonce.append('localisation', this.localisation);
      newAnnonce.append('moteur', this.moteur);
      newAnnonce.append('annee', `${this.annee}`);
      newAnnonce.append('carburant', this.carburant);
      newAnnonce.append('carosserie', this.carosserie);
      newAnnonce.append('kilometrage', this.kilometrage);
      newAnnonce.append('transmission', this.transmission);
      newAnnonce.append('climatisation', this.climatisation);
      newAnnonce.append('categorie_id', `${this.categorie_id}`);
      newAnnonce.append('image1', this.image as Blob);
      newAnnonce.append('image2', this.image as Blob);
      newAnnonce.append('image3', this.image as Blob);
      newAnnonce.append('image4', this.image as Blob);


      //  let imagesFormData = new FormData();
      //  if (this.images && this.images.length > 0) {
      //    for (let i = 0; i < this.images.length; i++) {
      //      imagesFormData.append('url[]', this.images[i]);
      //    }
      //  }

      console.log("Contenu de newAnnonce avant l'envoi :", newAnnonce);
      this.publierAnnonce.addAnnonce(newAnnonce).subscribe(
        (response: any) => {
          this.alertMessage('success', 'Super', 'Annonce ajouté avec succés');
          console.log(response);
          this.viderChamps();

          // Récupérer l'ID de l'annonce depuis la réponse
          // const annonceId = response.id;
          // console.log(annonceId);
          // Assurez-vous que votre backend renvoie l'ID correctement
          // Envoyer l'ID de l'annonce avec les images
          // imagesFormData.append('annonce_id', annonceId);

          // Envoi des images au backend
          // this.publierAnnonce.addAnnonce(imagesFormData).subscribe(
          //   (response) => {
          //     // Gestion de la réponse
          //     this.alertMessage('success', 'Cool', 'Image ajouté avec succés');
          //   },
          //   (error) => {
          //     // Gestion de l'erreur
          //     this.alertMessage(
          //       'error',
          //       'Oops',
          //       "Erreur lors de l'ajout de des images"
          //     );
          //   }
          // );

          // console.log(newAnnonce);
          //   console.log(response);
          //   console.log('Annonce ajouté avec succès.');
          //   this.alertMessage('success', 'Cool', 'Ann ajouté avec succés');
          //   console.log('Contenu de newAnnonce envoyé au serveur :', newAnnonce);
        
        },
        (error) => {
          this.alertMessage(
            'error',
            'Oops',
            "Erreur lors de l'ajout de l'annonce"
          );
          console.error(
            "Une erreur s'est produite lors de l'ajout de l'annonce: ",
            error
          );
        }
      );
    }
  }

  // vider champs
  viderChamps() {
    this.nom = '';
    this.marque = '';
    this.couleur = '';
    this.description = '';
    this.prix = 0;
    this.nbrePlace = 0;
    this.localisation = '';
    this.moteur = '';
    this.annee = 0;
    this.carburant = '';
    this.carosserie = '';
    this.kilometrage = '';
    this.transmission = '';
    this.climatisation = '';
    this.categorie_id = 0;
  }

  // Alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  // File img1
  onFileChange(event: any) {
    // console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  // File img secondaire
  imgSecondaires(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Faites quelque chose avec chaque fichier, par exemple l'afficher
        // console.log('Nom du fichier:', file.name);
        // console.log('Taille du fichier:', file.size);
        // console.log('Type de fichier:', file.type);
        // Vous pouvez également stocker les fichiers dans un tableau ou les ajouter à votre objet FormData selon vos besoins
      }
    }
  }
}

