import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListeUsersService } from 'src/app/services/liste-users.service';

@Component({
  selector: 'app-detail-proprietaire',
  templateUrl: './detail-proprietaire.component.html',
  styleUrls: ['./detail-proprietaire.component.css'],
})
export class DetailProprietaireComponent {
  proprietaire: any;

  constructor(
    private route: ActivatedRoute,
    private proprietaireService: ListeUsersService
  ) {}

  ngOnInit(): void {
    // this.getProprietaireDetail();
  }

  // getProprietaireDetail(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.proprietaireService
  //       .getProprietaireById(id)
  //       .subscribe((prop) => (this.proprietaire = prop));
  //   }
  // }
}
