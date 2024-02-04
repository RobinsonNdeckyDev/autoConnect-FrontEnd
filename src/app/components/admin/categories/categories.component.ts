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
  categories: any[] = [];
  nom: string = '';

  // categorie selectionnée
  categorieSelected: any;
  categorieToEdit: any;

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
    if (this.nom == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le titre du blog'
      );
      return; // Empêche la soumission si le champ est vide
    } else {
      const newCategorie = {
        nom: this.nom,
      };

      this.listeCategories.addCategorie(newCategorie).subscribe(
        (response) => {
          // /Insérer le nouveau blog au début de la liste des blogs
          this.categories.unshift(response);
          console.log('catégorie ajouté avec succès.');
          this.alertMessage('success', 'Cool', 'catégorie ajouté avec succés');
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
        this.alertMessage('info', 'Annulée', 'Modification de la catégorie annulée');
      }
    });

  }


  // Méthode pour éditer le blog
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
              'Cool',
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
          'Suppression dde la catégorie annulée'
        );
      }
    });
  }

  // Vider champs
  viderChamps() {
    this.nom = '';
  }

  // alert message
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
