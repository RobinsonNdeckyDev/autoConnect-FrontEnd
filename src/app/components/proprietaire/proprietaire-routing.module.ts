import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainVendeurComponent } from './main-vendeur/main-vendeur.component';
import { AnnoncesVendeursComponent } from './annonces-vendeurs/annonces-vendeurs.component';
import { ProfilVendeurComponent } from './profil-vendeur/profil-vendeur.component';
import { DetailAnnoncePropComponent } from './detail-annonce-prop/detail-annonce-prop.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';
import { ProprietaireGard } from 'src/app/guards/proprietaire-guard.guard';
// import { ModifierAnnonceComponent } from './modifier-annonce/modifier-annonce.component';


const routes: Routes = [
  {
    path: '',
    component: MainVendeurComponent,
    children: [
      {
        path: 'proprietaire',
        component: PublierAnnonceComponent, canActivate: [ProprietaireGard]
      },
      {
        path: 'mes_annonces',
        children: [
          { path: '', component: AnnoncesVendeursComponent },
          {
            path: 'detailAnnonce',
            component: DetailAnnoncePropComponent,
  
          },
        ],
      },
      {
        path: 'mon_profil',
        component: ProfilVendeurComponent,
      },
      {
        path: 'publierAnnonce',
        component: PublierAnnonceComponent,
      },
      {
        path: '',
        redirectTo: 'mes_annonces',
        pathMatch: 'full',
      },
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
