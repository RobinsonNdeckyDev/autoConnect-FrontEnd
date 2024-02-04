import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublierAnnonceService } from 'src/app/services/publier-annonce.service';

@Component({
  selector: 'app-annonces-vendeurs',
  templateUrl: './annonces-vendeurs.component.html',
  styleUrls: ['./annonces-vendeurs.component.css'],
})
export class AnnoncesVendeursComponent {
  annonces = true;
  validesAnnonces: any[] = [];
  invalidesAnnonces: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private annoncesValidesProps: PublierAnnonceService
  ) {}

  afficherAnnonces() {
    this.annonces = !this.annonces;
  }

  ngOnInit() {
    this.annoncesValides();
    this.annoncesInvalides();
  }

  annoncesValides() {
    this.annoncesValidesProps.getAnnonceValideProp().subscribe(
      (response: any) => {
        console.log(response);
        this.validesAnnonces = Object.values(response.annonceValides);
        console.log(this.validesAnnonces);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  annoncesInvalides() {
    this.annoncesValidesProps.getAnnonceInvalideProp().subscribe(
      (response: any) => {
        console.log(response);
        this.invalidesAnnonces = Object.values(response.annonceValides);
        console.log(this.invalidesAnnonces);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
