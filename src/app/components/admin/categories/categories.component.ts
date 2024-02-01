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
  categories: any[] = [];
  nom: string = '';
  categorieToEdit: Categorie = {
    id: 0,
    nom: ''
  };

  constructor(
    private listeCategories: ListeCategoriesService,
    private route: Router,
    http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCategories();
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

  // Méthode pour préparer l'édition du categorie sélectionné
  prepareEdit(categorie: any) {
    // Copier les données du categorie sélectionné dans blogToEdit
    this.categorieToEdit = { ...categorie };
  }

  // Méthode pour éditer le blog
  editCategorie() {
    // Appeler la méthode de votre service pour modifier le blog
    this.listeCategories.modifierCategorie(this.categorieToEdit.id, this.categorieToEdit).subscribe(
      (response) => {
        console.log(response);
        console.log('Catégorie modifié avec succès.');
        this.alertMessage('success', 'Cool', 'Catégorie modifié avec succès.');
        // Réinitialiser les champs après la modification
        this.viderChamps();
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la modification du blog: ",
          error
        );
      }
    );
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
