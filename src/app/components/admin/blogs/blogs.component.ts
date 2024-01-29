import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListeBlogsService } from 'src/app/services/liste-blogs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent {
  titre: string = '';
  image: string = '';
  description: string = '';
  selectedBlog: any;// Variable pour stocker le blog sélectionné
  blogDisplayMdf: any;

  Blogs: any[] = [];

  constructor(
    private listeBlogs: ListeBlogsService,
    private route: ActivatedRoute,
    http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  // Liste des Blogs
  getBlogs(): void {
    this.listeBlogs.getBlogs().subscribe(
      (response: any) => {
        console.log(response.blocs); // Affiche le tableau des categories dans la console

        // Maintenant, vous pouvez accéder à l'array categorie
        this.Blogs = response.blocs;
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
  addBlog() {
    if (this.titre == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner le titre du blog'
      );
      return; // Empêche la soumission si le champ est vide
    } else if (this.image == '') {
      this.alertMessage(
        'error',
        'Oops',
        "mMerci de renseigner l'image du blog"
      );
      return;
    } else if (this.description == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner la description du blog'
      );
      return;
    } else {
      const newBlog = {
        titre: this.titre,
        image: this.image,
        description: this.description,
      };

      this.listeBlogs.addblog(newBlog).subscribe(
        (response) => {
          console.log(response);
          console.log('blog ajouté avec succès.');
          this.alertMessage('success', 'Cool', 'blog ajouté avec succés');
          // Réinitialiser le champ après l'ajout
          this.viderChamps();
        },
        (error) => {
          console.error(
            "Une erreur s'est produite lors de l'ajout du blog: ",
            error
          );
        }
      );
    }
  }

  // Detail du blog
  openBlogDetailsModal(blog: any): void {
    this.selectedBlog = blog; // Stocke le blog sélectionné
  }


  // Modifier blog
  openEditBlogModal(blog: any): void {
    this.selectedBlog = { ...blog }; // Copie du blog sélectionné pour éviter de modifier le blog original directement
  }

  editBlog(): void {
    // Appel à la méthode de service pour modifier le blog
    this.listeBlogs.modifierBlog(this.selectedBlog).subscribe(
      (response) => {
        console.log(response);
        console.log('Blog modifié avec succès.');
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la modification du blog: ",
          error
        );
      }
    );
  }

  viderChamps() {
    this.titre = '';
    this.image = '';
    this.description = '';
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
