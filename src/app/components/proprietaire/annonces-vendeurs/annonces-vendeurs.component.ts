import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-annonces-vendeurs',
  templateUrl: './annonces-vendeurs.component.html',
  styleUrls: ['./annonces-vendeurs.component.css']
})
export class AnnoncesVendeursComponent {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  // Utilisez snapshot ou subscribe en fonction de vos besoins
  const userId = this.route.snapshot.paramMap.get('id');
  // Faites quelque chose avec userId, par exemple, chargez les données du propriétaire avec cet ID.
}



}
