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
  image!: File;
  description: string = '';

  // Variable pour stocker le blog sélectionné
  selectedBlog: any;
  blogToEdit: any;

  // Tableau pour stocker les blogs filtrés
  filteredBlogs: any[] = [];

  // Propriété pour stocker le terme de recherche
  searchTerm: string = '';
  files: any[] = [];

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
        this.filterBlogs();
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des categories : ",
          error
        );
      }
    );
  }

  // Méthode pour filtrer les blogs en fonction du terme de recherche
  filterBlogs(): void {
    this.filteredBlogs = this.Blogs.filter((blog) =>
      blog.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
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
    } else if (this.description == '') {
      this.alertMessage(
        'error',
        'Oops',
        'Merci de renseigner la description du blog'
      );
      return;
    } else {
      let newBlog = new FormData();
      newBlog.append('titre', this.titre);
      newBlog.append('image', this.image as Blob);
      newBlog.append('description', this.description);

      this.listeBlogs.addblog(newBlog).subscribe(
        (response) => {
          // /Insérer le nouveau blog au début de la liste des blogs
          this.Blogs.unshift(response);
          console.log('blog ajouté avec succès.');
          this.alertMessage('success', 'Cool', 'blog ajouté avec succés');
          // Rafraîchir la liste des blogs après l'ajout
          this.getBlogs();
          // Réinitialiser le champ après l'ajout
          this.viderChamps();
        },
        (error) => {
          this.alertMessage('error', 'Oops', "Erreur lors de l'ajout du blog");
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

  // Méthode pour préparer l'édition du blog sélectionné
  prepareEdit(blog: any) {
    // Copier les données du blog sélectionné dans blogToEdit
    this.blogToEdit = { ...blog };
  }

  // Méthode pour éditer le blog
  editBlog() {
    // Appeler la méthode de votre service pour modifier le blog
    this.listeBlogs.modifierBlog(this.blogToEdit.id, this.blogToEdit).subscribe(
      (response) => {
        console.log(response);
        console.log('Blog modifié avec succès.');
        this.alertMessage('success', 'Cool', 'Blog modifié avec succès.');
        // Réinitialiser les champs après la modification
        this.viderChamps();
        this.getBlogs();
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la modification du blog: ",
          error
        );
      }
    );
  }

  // Supprimer blog
  supprimerBlog(blogId: number): void {
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
        this.listeBlogs.deleteBlog(blogId).subscribe(
          () => {
            console.log('Le blog a été supprimé avec succès.');
            this.alertMessage(
              'success',
              'réussie',
              'Blog supprimé avec succès'
            );
            this.getBlogs();
          },
          (error) => {
            console.error(
              "Une erreur s'est produite lors de la suppression du blog :",
              error
            );
            this.alertMessage(
              'error',
              'Oops',
              'Erreur lors de la suppression du blog'
            );
            // Gérer l'erreur de suppression du blog
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si l'utilisateur clique sur "Annuler"
        console.log('La suppression du blog a été annulée.');
        this.alertMessage('info', 'Annulée', 'Suppression du blog annulée');
      }
    });
  }

  viderChamps() {
    this.titre = '';
    // this.image = '';
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

  onFileChange(event: any) {
    // this.files = event.target.files[0];
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }
}
