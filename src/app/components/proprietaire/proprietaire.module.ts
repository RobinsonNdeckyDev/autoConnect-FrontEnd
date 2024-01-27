import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProprietaireRoutingModule } from './proprietaire-routing.module';
import { MainVendeurComponent } from './main-vendeur/main-vendeur.component';
import { AnnoncesVendeursComponent } from './annonces-vendeurs/annonces-vendeurs.component';
import { ProfilVendeurComponent } from './profil-vendeur/profil-vendeur.component';
import { SidebarVendeurComponent } from './sidebar-vendeur/sidebar-vendeur.component';
import { NavbarVendeurComponent } from './navbar-vendeur/navbar-vendeur.component';
import { ScrollButtonComponent } from './scroll-button/scroll-button.component';
import { DetailAnnoncePropComponent } from './detail-annonce-prop/detail-annonce-prop.component';
import { RouterModule } from '@angular/router';
import { LogoutProprietaireComponent } from './logout-proprietaire/logout-proprietaire.component';



@NgModule({
  declarations: [
    MainVendeurComponent,
    AnnoncesVendeursComponent,
    ProfilVendeurComponent,
    SidebarVendeurComponent,
    NavbarVendeurComponent,
    ScrollButtonComponent,
    DetailAnnoncePropComponent,
    LogoutProprietaireComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProprietaireRoutingModule
  ]
})
export class ProprietaireModule { }
