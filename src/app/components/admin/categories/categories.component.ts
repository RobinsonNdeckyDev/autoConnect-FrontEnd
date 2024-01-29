import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeCategoriesService } from 'src/app/services/liste-categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categories: any[] = [];
  categorie: string = '';

  constructor(
    private listeCategories: ListeCategoriesService,
    private route: Router,
    http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

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

  onSubmit() {
    if (!this.categorie.trim()) {
      this.alertMessage("error", "Oops", "Merci de renseigner la catégorie")
      return; // Empêche la soumission si le champ est vide
    }

    const newCategorie = {
      name: this.categorie,
    };

    this.listeCategories.addCategory(newCategorie).subscribe(
      (response) => {
        console.log(response);
        console.log('Catégorie ajoutée avec succès.');
        this.alertMessage('success', 'Cool', 'Catégorie ajouté avec succés');
        // Réinitialiser le champ après l'ajout
        this.categorie = '';
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de l'ajout de la catégorie : ",
          error
        );
      }
    );
  }

  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
