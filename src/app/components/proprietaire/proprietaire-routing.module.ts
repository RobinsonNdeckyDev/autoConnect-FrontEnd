import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainVendeurComponent } from './main-vendeur/main-vendeur.component';
import { AnnoncesVendeursComponent } from './annonces-vendeurs/annonces-vendeurs.component';
import { ProfilVendeurComponent } from './profil-vendeur/profil-vendeur.component';
import { DetailAnnoncePropComponent } from './detail-annonce-prop/detail-annonce-prop.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';


const routes: Routes = [
  {
    path: '',
    component: MainVendeurComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'proprietaire', component: PublierAnnonceComponent },
      {
        path: 'mes_annonces',
        children: [
          { path: '', component: AnnoncesVendeursComponent },
          { path: 'detailAnnonce', component: DetailAnnoncePropComponent },
        ],
      },
      { path: 'mon_profil', component: ProfilVendeurComponent },
      { path: 'publierAnnonce', component: PublierAnnonceComponent },
      { path: '', redirectTo: 'mes_annonces', pathMatch: 'full' },
    ],
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class ProprietaireRoutingModule { }
