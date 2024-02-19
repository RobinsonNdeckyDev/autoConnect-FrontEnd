import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie';
import { ListeCategoriesService } from 'src/app/services/liste-categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  CategoriesListe: boolean = true;
  categories: any[] = [];
  categorie: string = '';

  // categorie selectionnée
  categorieSelected: any;
  categorieToEdit: any;

  // Messages de validation
  validationMessages: { [key: string]: string } = {};

  // Déclaration des propriétés touched
  categorieTouched: boolean = false;

  // Déclaration des propriétés Empty
  categorieEmpty: boolean = false;

  // Categorie regex
  categorieRegex: RegExp = /^[a-z\s]{4,}$/;

  constructor(
    private listeCategories: ListeCategoriesService,
    private route: Router,
    http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCategories();

    // dtoptions
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

  // Liste Categories
  getCategories(): void {
    this.listeCategories.getCategories().subscribe(
      (response: any) => {
        console.log(response.categories); // Affiche le tableau des categories dans la console

        // Maintenant, vous pouvez accéder à l'array categorie
        this.categories = response.categories;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des categories : ",
          error
        );
      }
    );
  }

  // Ajout d'un blog
  addCategorie() {
    console.log(this.categorie);

    // validation de la categorie
    this.validateCategorie();

    // Enregistrement de la categorie
    this.registerCategorie();
  }

  // Register categorie
  registerCategorie(){
      const newCategorie = {
        nom: this.categorie,
      };

      this.listeCategories.addCategorie(newCategorie).subscribe(
        (response) => {
          // /Insérer le nouveau blog au début de la liste des blogs
          this.categories.unshift(response);
          console.log('catégorie ajouté avec succès.');
          this.alertMessage('success', 'Ajouté', 'catégorie ajouté avec succés');
          // Rafraîchir la liste des blogs après l'ajout
          this.getCategories();
          // Réinitialiser le champ après l'ajout
          this.viderChamps();
        },
        (error) => {
          console.error(
            "Une erreur s'est produite lors de l'ajout de la catégorie: ",
            error
          );
        }
      );
  }

  // Méthode pour préparer l'édition du blog sélectionné
  prepareEdit(categorie: any) {
    // Copier les données du categorie sélectionné dans blogToEdit
    this.categorieToEdit = { ...categorie };
  }

  // Méthode pour éditer le blog
  editCategorie() {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir cette categorie ?',
      text: 'Vous allez cette categorie !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, modifier',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, modifier"
        // Appeler la méthode de votre service pour modifier le blog
        this.listeCategories
          .modifierCategorie(this.categorieToEdit.id, this.categorieToEdit)
          .subscribe(
            (response) => {
              console.log(response);
              console.log('Categorie modifiée avec succès.');
              this.alertMessage(
                'success',
                'Cool',
                'Categorie modifiée avec succès.'
              );
              // Réinitialiser les champs après la modification
              this.viderChamps();
              this.getCategories();
            },
            (error) => {
              console.error(
                "Une erreur s'est produite lors de la modification du blog: ",
                error
              );
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log('La modification de la catégorie a été annulée.');
        this.alertMessage(
          'info',
          'Annulée',
          'Modification de la catégorie annulée'
        );
      }
    });
  }

  // Méthode supprimer un blog
  deleteCategorie(categorieId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce blog ?',
      text: 'Vous allez supprimer ce blog !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F42A8',
      cancelButtonColor: 'black',
      confirmButtonText: 'Oui, supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, supprimer"
        // Appeler la méthode de votre service pour supprimer une categorie
        this.listeCategories.deleteCategorie(categorieId).subscribe(
          (response) => {
            console.log(response);
            console.log('Catégorie supprimée avec succès.');
            this.alertMessage(
              'success',
              'Supprimée',
              'Catégorie supprimée avec succès.'
            );

            this.getCategories();
          },
          (error) => {
            console.error(
              "Une erreur s'est produite lors de la suppression de la catégorie: ",
              error
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log('La suppression de la catégorie a été annulée.');
        this.alertMessage(
          'info',
          'Annulée',
          'Suppression de la catégorie annulée'
        );
      }
    });
  }

  // Méthode de validation pour le champ "categorie"
  validateCategorie() {
    if (!this.categorie) {
      this.validationMessages['categorie'] = "La categorie est requise";
      this.categorieEmpty = true;
      return false;
    } else if (!this.categorieRegex.test(this.categorie)) {
      this.validationMessages['categorie'] =
        "La categorie doit contenir au moins 4 caractères et en minuscule.";
      this.categorieEmpty = false;
      return false;
    } else {
      this.validationMessages['categorie'] = '';
      this.categorieEmpty = false;
      return true;
    }
  }

  // Vider champs
  viderChamps() {
    this.categorie = '';
  }

  // alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: 2000, // Durée en millisecondes avant la disparition
      timerProgressBar: true, // Barre de progression de la temporisation
      showConfirmButton: false, // Cacher le bouton de confirmation
    });
  }

  // Afficher categories
  afficherCategories() {
    this.CategoriesListe = !this.CategoriesListe;
  }
}
